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
