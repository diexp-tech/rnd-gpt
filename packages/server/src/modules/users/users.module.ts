import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UsersController } from "./controllers";
import { MessageEntity, UserEntity } from "./entities";
import { UsersService } from "./services";
import { GptService } from "./services/gpt.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      MessageEntity,
    ]),
  ],
  providers: [
    UsersService,
    GptService,
  ],
  exports: [
    UsersService,
  ],
  controllers: [
    UsersController,
  ],
})
export class UsersModule {}
