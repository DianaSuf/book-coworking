export enum  AppRoute {
  Root = '/',
  Profile = '/profile',
  NotFound = '*',
}

export enum AuthorizationStatus {
  User = 'USER',
  Admin = 'ADMIN',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum  APIRoute {
  Status = '/Brusnika/status',
  Refresh = '/Brusnika/refresh',
  Register = '/Brusnika/registration',
  Login = '/Brusnika/login'
}
