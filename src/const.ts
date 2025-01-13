export enum AppRoute {
  Root = '/',
  Confirm = '/verification',
  Profile = '/profile',
  Book = '/book',
  Notify = '/notification',
  Password = '/password',
  NotFound = '*',
}

export enum AuthorizationStatus {
  USER = 'USER',
  ADMIN = 'ADMIN',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum APIRoute {
  Status = '/Brusnika/user/status',
  Refresh = '/Brusnika/auth/refresh',
  Register = '/Brusnika/auth/registration',
  Login = '/Brusnika/auth/login',
  ConfirmRegister = '/Brusnika/auth/confirmReg',
  UserProfile = '/Brusnika/user/profile',
  AdminProfile = '/Brusnika/admin/profile',
  UpdateUserRealname = '/Brusnika/user/updateRealname',
  UpdateUserPassword = '/Brusnika/user/updatePassword',
  ResetUserPassword = '/Brusnika/auth/password',
  ConfirmPassword = '/Brusnika/auth/confirmPas',
  BusyTables = '/Brusnika/user/busyTables',
  SearchUsers = '/Brusnika/user/group',
  Reserval = '/Brusnika/user/reserval',
  ReservalAdmin = '/Brusnika/admin/reserval',
  Notifications = '/Brusnika/user/notifications',
  CancelReserval = '/Brusnika/user/cancel',
  ConfirmReserval = '/Brusnika/user/codeReserval',
  ConfirmReservalGroup = '/Brusnika/user/groupReserval',
}

export enum ActionButtonType {
  Red = 'red',
  Black = 'black',
}

export enum ReservalType {
  CODE = 'CODE',
  GROUP = 'GROUP',
}

export enum StateType {
  TRUE = 'TRUE',
  FALSE = 'FALSE',
  CONFIRMED = 'CONFIRMED',
}

export enum ModalType {
  Login = 'login',
  Register = 'register',
  ForgotPassword = 'forgotPassword',
  ConfirmRegister = 'confirmRegister',
  SuccessReserval = 'successReserval',
  ConfirmBooking = 'confirmBooking',
  SuccessConfirmPassword = 'successConfirmPassword',
  SuccessConfirmBooking = 'successConfirmBooking',
  SuccessResetPassword = 'successResetPassword',
}
