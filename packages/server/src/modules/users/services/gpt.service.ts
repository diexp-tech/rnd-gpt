import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { OpenAI } from "openai";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { Repository } from "typeorm";

import { SendMessageDto } from "../dto";
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
    this.openai = new OpenAI({ apiKey: this.configService.get("GPT_API_KEY") });
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
}
