export enum ConversationType {
  SINGLE = 'single',
  GROUP = 'group',
}

export interface Requests {
  createdAt: string;
  requestedBy: {
    email: string;
    fullName: string;
    _id: string;
  };
  requestedTo: string;
  type: ConversationType;
  updatedAt: string;
  __v: number;
  _id: string;
}

export enum RequestActions {
  ACCEPT = 'accept',
  REJECT = 'reject',
}
