import { IDataBusyTables } from "./book-data";
import { IReserval } from "./notification-data";
import { IUserData, IUserDataWithId } from "./user-data";

export type IDate = Pick<IDataBusyTables, 'date'>;

export interface IUserReserval extends IUserData, IReserval {}

export interface IUserBlock extends IUserDataWithId {
  countBlock: number;
}
