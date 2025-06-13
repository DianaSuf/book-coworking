export interface INotification {
  id: number;
  timeSend: string;
  title: string;
  text: string;
}

export interface INotificationsData {
  notificationFormsFalse: INotification[];
  notificationFormsTrue: INotification[];
}
