export interface Conversation {
  email: string;
  fullName: string;
  _id: string;
}

export interface Users {
  email: string;
  fullName: string;
  _id: string;
}

export interface Conversatoins {
  conversation: Conversation[];
  users: Users[];
  participantsLength: number;
}
