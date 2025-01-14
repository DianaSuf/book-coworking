import { IDataBusyTables } from "./book-data";
import { IReserval } from "./notification-data";
import { IUserData } from "./user-data";

export type IDate = Pick<IDataBusyTables, 'date'>;

export interface IUserReserval extends IUserData, IReserval {}
