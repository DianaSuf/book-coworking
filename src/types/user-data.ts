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

export interface FetchBusyTablesParams {
  date: string;
  timeStart: string | null;
  timeEnd: string | null;
}

export interface IDataReserval extends FetchBusyTablesParams {
  tables: number[];
  usernames?: string[];
}

export type IReservalType = 'CODE' | 'GROUP';

export interface IReserval {
  id: number;
  dateReserval: string;
  timeStartReserval: string;
  timeEndReserval: string;
  table: number;
}

export interface INotification extends IReserval {
  timeSend: string;
  type: IReservalType;
  state: boolean;
  invit: string;
}

export interface INotificationsData {
  reservals: IReserval[];
  todayNotifications: INotification[];
  last7DaysNotifications: INotification[];
  lastMonthNotifications: INotification[];
}

export type IReservalId = Pick<IUserDataWithId, 'id'>;
