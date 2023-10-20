import { IsBoolean, IsOptional, IsString } from "class-validator";

export class SendMessageBody {
  @IsString()
  message: string;

  @IsBoolean()
  @IsOptional()
  skipMessageCreation?: boolean;
}
