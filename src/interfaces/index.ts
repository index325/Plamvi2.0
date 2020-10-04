export interface IUser {
  email: string;
  name: string;
}

export interface IFailureMessage {
  message: string;
  messageType: string;
  isDialog: boolean;
}
