export type IReservalType = 'CODE' | 'GROUP';

export type IStateType = 'TRUE' | 'CONFIRMED' | 'FALSE';

export interface INotification {
  id: number;
  dateReserval: string;
  timeStartReserval: string;
  timeEndReserval: string;
  table: number;
  timeSend: string;
  type: IReservalType;
  state: IStateType;
  invit: string;
}

export interface INotificationsData {
  notificationFormsFalse: INotification[];
  notificationFormsTrue: INotification[];
}
