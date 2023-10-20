import { Body, Controller, Get, Post, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

import { SendMessageBody } from "../dto";
import { MessageEntity, UserEntity } from "../entities";
import { UsersService } from "../services";
import { GptService } from "../services/gpt.service";

import { ReqUserId, UploadMusicFile, WithUser } from "@module/common/decorators";


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

  @Post("voice")
  @UseInterceptors(
    FileInterceptor(
      "audio",
      {
        limits: {
          fileSize: 1024e5,
        },
      }),
  )
  async uploadFile(
    @UploadMusicFile() file: Express.Multer.File,
    @ReqUserId() userId: string,
  ): Promise<MessageEntity> {
    return await this.gptService.sendAudio({ file, userId });
  }
}
