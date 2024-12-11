export enum  AppRoute {
  Root = '/',
  Profile = '/profile',
  Confirm = '/verification',
  NotFound = '*',
}

export enum AuthorizationStatus {
  USER = 'USER',
  ADMIN = 'ADMIN',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum  APIRoute {
  Status = '/Brusnika/status',
  Refresh = '/Brusnika/refresh',
  Register = '/Brusnika/registration',
  Login = '/Brusnika/login',
  Confirm = '/Brusnika/confirm',
}

export enum  ActionButtonType {
  Red = 'red',
  Black = 'black',
}
