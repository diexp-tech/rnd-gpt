import { MessageRole } from "@/types/message-role.enum";

export interface IUser {
  id: string;
  fingerprint: string;
}

export interface IMessage {
  id?: string;
  userId?: string;
  text: string;
  role: MessageRole;
}
