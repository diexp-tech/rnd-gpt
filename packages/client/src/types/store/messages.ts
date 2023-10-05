export interface IMessage {
  text: string;
}

export interface IMessagesState {
  messages: IMessage[];
  sendMessage: (text: string) => void;
  isLoading: boolean;
}
