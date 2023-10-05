import { Body, Controller, Get, Post } from "@nestjs/common";

import { SendMessageBody } from "../dto";
import { UserEntity } from "../entities";
import { UsersService } from "../services";
import { GptService } from "../services/gpt.service";

import { ReqUserId, WithUser } from "@module/common/decorators";

@Controller("users")
@WithUser()
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly gptService: GptService,
  ) {}

  @Get("my")
  async getMyUser(@ReqUserId() userId: string): Promise<UserEntity> {
    return await this.userService.findOneWithMessages(userId);
  }

  @Post("message")
  async sendMessage(@ReqUserId() userId: string, @Body() body: SendMessageBody): Promise<unknown> {
    return await this.gptService.sendMessage({ userId, ...body });
  }
}
