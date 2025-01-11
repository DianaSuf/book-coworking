export enum  AppRoute {
  Root = '/',
  Confirm = '/verification',
  Profile = '/profile',
  Book = '/book',
  Notify = '/notify',
  NotFound = '*',
}

export enum AuthorizationStatus {
  USER = 'USER',
  ADMIN = 'ADMIN',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum  APIRoute {
  Status = '/Brusnika/user/status',
  Refresh = '/Brusnika/auth/refresh',
  Register = '/Brusnika/auth/registration',
  Login = '/Brusnika/auth/login',
  ConfirmRegister = '/Brusnika/auth/confirmReg',
  DataUser = '/Brusnika/user/profile',
  UpdateUserRealname = '/Brusnika/user/updateRealname',
  UpdateUserPassword = '/Brusnika/user/updatePassword',
  ResetUserPassword = '/Brusnika/auth/password',
  BusyTables = '/Brusnika/user/busyTables',
  SearchUsers = '/Brusnika/user/group',
  Reserval = '/Brusnika/user/reserval',
}

export enum  ActionButtonType {
  Red = 'red',
  Black = 'black',
}

export type ModalType = 'login' | 'register' | 'forgotPassword' | 'confirmRegister' | 'successReserval' | null;
