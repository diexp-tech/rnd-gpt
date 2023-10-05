export interface IUser {
  id: string;
  fingerprint: string;
}

export interface IMessage {
  id: string;
  userId: string;
  text: string;
}
