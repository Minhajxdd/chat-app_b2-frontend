export enum RequestActions {
  ACCEPT = 'accept',
  REJECT = 'reject',
}

export interface Conversation {
  createdAt: string;
  type: RequestActions;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface Users {
  email: string;
  fullName: string;
  _id: string;
}

export interface Conversations {
  conversation: Conversation[];
  users: Users[];
  participantsLength: number;
}
