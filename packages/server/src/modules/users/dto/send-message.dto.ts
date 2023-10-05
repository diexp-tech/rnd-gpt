import { SendMessageBody } from "./send-message.body";

export interface SendMessageDto extends SendMessageBody {
  userId: string;
}
