export interface IDataBusyTables {
  date: string;
  timeStart: string | null;
  timeEnd: string | null;
}

export interface IDataReserval extends IDataBusyTables {
  tables: number[];
  usernames?: string[];
}

export interface IAdminReserval extends IDataBusyTables {
  tables: number[];
}

export interface IUserParams {
  user: string;
}
