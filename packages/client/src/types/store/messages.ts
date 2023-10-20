import { IMessage } from "@/models/models";

export interface IMessagesState {
  messages: IMessage[];
  sendMessage: (text: string) => void;
  sendAudioMessage: (data: Blob) => void;
  isLoading: boolean;
  isAudioLoading: boolean;
}
