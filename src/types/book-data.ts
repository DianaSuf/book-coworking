export interface IDataBusyTables {
  date: string;
  timeStart: string | null;
  timeEnd: string | null;
}

export interface IDataReserval extends IDataBusyTables {
  tables: number[];
  usernames?: string[];
}

export interface IUserParams {
  user: string;
}
