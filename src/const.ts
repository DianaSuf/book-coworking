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
  Confirm = '/Brusnika/auth/confirm',
}

export enum  ActionButtonType {
  Red = 'red',
  Black = 'black',
}
