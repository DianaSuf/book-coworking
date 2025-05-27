import { IUserDataWithId } from "./user-data";

export type IReservalType = 'CODE' | 'GROUP';

export type IStateType = 'TRUE' | 'CONFIRMED' | 'FALSE';

export interface IReserval {
  id: number;
  dateReserval: string;
  timeStartReserval: string;
  timeEndReserval: string;
  sendTime: string,
  table: number;
  stateReserval: IStateType,
  stateGroup: IReservalType,
  invit: string;
}

export interface IReservalData {
  todayReserval: IReserval[];
  last7DaysReserval: IReserval[];
  lastMonthReserval: IReserval[];
  oldReserval: IReserval[];
}

export type IReservalId = Pick<IUserDataWithId, 'id'>;

export interface IConfirmReserval extends IReservalId {
  code: string;
}
