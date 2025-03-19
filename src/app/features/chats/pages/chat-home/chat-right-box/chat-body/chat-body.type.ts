export interface MessageDataModel {
  conversation: string;
  sender: string;
  text: string;
  time: string;
}

export interface ChatMessageModel {
  content: string;
  conversation: string;
  createdAt: string;
  file: null;
  messageType: string;
  sender: string;
  updatedAt: string;
  __v: number;
  _id: string;
}
