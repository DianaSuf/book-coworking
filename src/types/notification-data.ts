import { IUserDataWithId } from "./user-data";

export type IReservalType = 'CODE' | 'GROUP';

export type IStateType = 'TRUE' | 'CONFIRMED' | 'FALSE';

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
  state: IStateType;
  invit: string;
}

export interface INotificationsData {
  reservals: IReserval[];
  todayNotifications: INotification[];
  last7DaysNotifications: INotification[];
  lastMonthNotifications: INotification[];
}

export type IReservalId = Pick<IUserDataWithId, 'id'>;

export interface IConfirmReserval extends IReserval {
  code: string;
}
