import { spawn } from "node:child_process";
import { Readable, Writable } from "node:stream";

import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { OpenAI } from "openai";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { Repository } from "typeorm";

import { SendAudioDto, SendMessageDto } from "../dto";
import { MessageEntity } from "../entities";
import { MessageRole } from "../enums";

interface FileVolume {
  meanVolume: number;
  maxVolume: number;
}

@Injectable()
export class GptService {
  private readonly logger = new Logger(GptService.name);
  private readonly openai: OpenAI;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
  ) {
    const apiKey = this.configService.get("GPT_API_KEY");
    this.openai = new OpenAI({ apiKey });
  }

  async sendMessage(data: SendMessageDto) {
    const { userId, message, skipMessageCreation } = data;

    const messages: ChatCompletionMessageParam[] = [{ role: "user", content: message, name: userId }];

    if (!skipMessageCreation) {
      await this.messageRepository.insert({ userId, text: message, role: MessageRole.USER });
    }

    const { choices, ...restResponse } = await this.openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 1,
      max_tokens: 1024,
    });

    const newMessage = this.messageRepository.create({
      userId,
      text: choices[0].message.content,
      meta: restResponse,
      finishReason: choices[0].finish_reason,
      role: MessageRole.CHAT_GPT,
    });

    return await this.messageRepository.save(newMessage);
  }

  async sendAudio(data: SendAudioDto): Promise<MessageEntity> {
    const { userId, file } = data;

    const { meanVolume, maxVolume } = await this.getFileVolume(file);

    let fileBuffer = file.buffer;
    if (meanVolume < 0 || maxVolume < 0) {
      fileBuffer = await this.increaseFileVolume(file, maxVolume);
    }

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${this.configService.get("GPT_API_KEY")}`);

    const formData = new FormData();
    formData.append("file", new Blob([fileBuffer]), "audio.mp4");
    formData.append("model", "whisper-1");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formData,
    };

    const response = await fetch(
      "https://api.openai.com/v1/audio/transcriptions",
      requestOptions,
    )
      .then((res) => res.json());

    const newMessage = this.messageRepository.create({
      userId,
      text: response.text,
      role: MessageRole.USER,
    });

    return await this.messageRepository.save(newMessage);
  }

  private async getFileVolume(file: Express.Multer.File): Promise<FileVolume> {
    try {
      const outputStream = new Writable();
      let volumeInfo = "";

      outputStream._write = (chunk, _encoding, callback) => {
        volumeInfo += chunk.toString();
        callback();
      };

      await new Promise<void>((resolve, reject) => {
        const inspector = spawn("ffmpeg", [
          "-i", "pipe:0", // Use 'pipe:0' to read from standard input
          "-af", "volumedetect",
          "-f", "null", "/dev/null",
        ]);

        inspector.stderr.pipe(outputStream);

        // Pipe the input file stream to FFmpeg
        Readable.from(file.buffer).pipe(inspector.stdin);

        inspector.on("exit", (code) => {
          if (code === 0) {
            // FFmpeg process completed successfully
            resolve();
          } else {
            this.logger.error("FFmpeg process failed with code", code);
            reject(code);
          }
        });
      });

      const meanMatch = volumeInfo.match(/mean_volume: -?[\d.]+ dB/);

      if (!meanMatch) {
        throw new Error("No match for mean_volume");
      }

      const meanVolume = Number(
        meanMatch[0]
          .split("mean_volume: ")[1]
          .split(" dB")[0],
      );

      const maxMatch = volumeInfo.match(/max_volume: -?[\d.]+ dB/);

      if (!maxMatch) {
        throw new Error("No match for max_volume");
      }

      const maxVolume = Number(
        maxMatch[0]
          .split("max_volume: ")[1]
          .split(" dB")[0],
      );

      return ({ meanVolume, maxVolume });
    } catch (e) {
      throw new Error("Failed to get file volume", { cause: e });
    }
  }

  private async increaseFileVolume(file: Express.Multer.File, volumeLevel: number): Promise<Buffer> {
    return await new Promise<Buffer>((resolve, reject) => {
      let outputBuffer = Buffer.from([]);
      const ffmpegCommand = [
        "-i", "pipe:0",
        "-af", `volume=${Math.abs(volumeLevel) + 10}dB`,
        "-f", "wav",
        "pipe:1",
      ];

      const ffmpegProcess = spawn("ffmpeg", ffmpegCommand);

      Readable.from(file.buffer).pipe(ffmpegProcess.stdin);

      ffmpegProcess.stdout.on("data", (data) => {
        // Collect the data in the output buffer
        outputBuffer = Buffer.concat([outputBuffer, data]);
      });

      ffmpegProcess.on("close", (code) => {
        if (code === 0) {
          resolve(outputBuffer);
        } else {
          reject(new Error(`FFmpeg process exited with code ${code}`));
        }
      });
    });
  }
}
