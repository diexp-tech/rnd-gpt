import { IsString } from "class-validator";

export class SendMessageBody {
  @IsString()
  message: string;
}
