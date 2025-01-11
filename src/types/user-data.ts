import { AuthorizationStatus } from "../const";

export interface IAuthRole {
  role: keyof typeof AuthorizationStatus;
}

export interface IRegisterData {
  username: string;
  realname: string;
  password: string;
}

export interface ILoginData {
  username: string;
  password: string;
}

export interface IRefreshData {
  token: string;
}

export interface IUserData {
  username: string;
  realname: string;
}

export type IRealNameData = Pick<IUserData, 'realname'>;

export type IUserNameData = Pick<IUserData, 'username'>;

export interface IUserDataWithId extends IUserData {
  id: number;
}

export interface IMessage {
  message: string;
}

export interface IPassword {
  oldPassword: string;
  newPassword: string;
}

export interface ITokenResponse {
  tokenAccess: string;
  tokenRefresh: string;
  role: keyof typeof AuthorizationStatus;
}

export interface FetchUsersDataParams {
  user: string;
}

export interface FetchFreeTablesParams {
  date: string;
  timeStart: string;
  timeEnd: string;
}
