import { IUserDataWithId } from "./user-data";

export type IReservalType = 'GROUP' | 'ACTIVE' | 'ACTIVE_TWO_HOUR' | 'EXPECTATION_CODE' | 'CONFIRMED' | 'UNCONFIRMED';

export interface IReserval {
  id: number;
  dateReserval: string;
  timeStartReserval: string;
  timeEndReserval: string;
  sendTime: string,
  table: number;
  type: IReservalType,
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
