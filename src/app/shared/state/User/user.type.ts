export interface UserModel {
  email: string;
  fullName: string;
  _id: string;
}

export type UserKeys = keyof UserModel;