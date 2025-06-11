export type IStateType = 'TRUE' | 'CONFIRMED' | 'FALSE';

export interface INotification {
  id: number;
  timeSend: string;
  title: string;
  text: string;
  state: IStateType;
}

export interface INotificationsData {
  notificationFormsFalse: INotification[];
  notificationFormsTrue: INotification[];
}
