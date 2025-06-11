export enum AppRoute {
  Root = '/',
  Confirm = '/verification',
  Profile = '/profile',
  Book = '/book',
  Notify = '/notification',
  Reservals = '/reservals',
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
  SearchData = '/Brusnika/admin/reservals',
  SearchBlock = '/Brusnika/admin/list',
  Reserval = '/Brusnika/user/reserval',
  ReservalAdmin = '/Brusnika/admin/reserval',
  Notifications = '/Brusnika/user/notificationsSort',
  Reservals = '/Brusnika/user/reservalsSort',
  CancelReserval = '/Brusnika/user/cancel',
  ConfirmReserval = '/Brusnika/user/codeReserval',
  ConfirmReservalGroup = '/Brusnika/user/groupReserval',
  BlockUser = '/Brusnika/admin/block',
  UnblockUser = '/Brusnika/admin/unblock',
}

export enum ActionButtonType {
  Red = 'red',
  Black = 'black',
}

export enum ReservalGroup {
  TRUE = 'TRUE',
  FALSE = 'FALSE',
}

export enum ReservalType {
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

export enum seatColorsType {
  Selected = 'selected',
  Busy = 'busy',
  Available = 'available',
}

export const seatColors = {
  selected: {
    primary: '#9ACA3C',
    secondary: '#C1DC8B'
  },
  busy: {
    primary: '#B8B8B8',
    secondary: '#D5D0CF'
  },
  available: {
    primary: '#F5887A',
    secondary: '#F9B2A4'
  }
};
