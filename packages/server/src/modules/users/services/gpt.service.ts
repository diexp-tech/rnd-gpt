import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { OpenAI } from "openai";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { Repository } from "typeorm";

import { SendAudioDto, SendMessageDto } from "../dto";
import { MessageEntity } from "../entities";
import { MessageRole } from "../enums";

@Injectable()
export class GptService {
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
    const { userId, message } = data;

    const messages: ChatCompletionMessageParam[] = [{ role: "user", content: message, name: userId }];

    await this.messageRepository.insert({ userId, text: message, role: MessageRole.USER });

    const { choices, ...restResponse } = await this.openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 1,
      max_tokens: 1024,
    });

    const newMessage = this.messageRepository.create({
      userId,
      text: choices[0].message.content,
      meta: restResponse as any,
      finishReason: choices[0].finish_reason,
      role: MessageRole.CHAT_GPT,
    });

    return await this.messageRepository.save(newMessage);
  }

  async sendAudio(data: SendAudioDto): Promise<MessageEntity> {
    const { userId, file } = data;


    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${this.configService.get("GPT_API_KEY")}`);

    const formData = new FormData();
    formData.append("file", new Blob([file.buffer]), "audio.mp4");
    formData.append("model", "whisper-1");
    formData.append("language", "en");
    formData.append("temperature", "0.5");

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
}
