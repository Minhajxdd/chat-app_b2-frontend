import { ConversationType } from '../chat-home.model';

export interface Conversation {
  createdAt: string;
  type: ConversationType;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface Users {
  email: string;
  fullName: string;
  _id: string;
}

export interface groupDetails {
  admins: [string];
  conversation: string;
  description: string;
  title: string;
  _id: string;
}

export interface Conversations {
  conversation: Conversation[];
  users: Users[];
  groupDetails: groupDetails[]
  participantsLength: number;
}
