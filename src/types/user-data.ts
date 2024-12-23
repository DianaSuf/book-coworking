import { AuthorizationStatus } from "../const";

export interface AuthRole {
  role: keyof typeof AuthorizationStatus;
}

export interface RegisterData {
  username: string;
  realname: string;
  password: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface RefreshData {
  token: string;
}

export interface ConfirmData {
  message: string;
}
export interface ConfirmResponse {
  tokenAccess: string;
  tokenRefresh: string;
  role: keyof typeof AuthorizationStatus;
}

export interface RegisterResponse {
  message: string;
}

export interface LoginResponse {
  tokenAccess: string;
  tokenRefresh: string;
  role: keyof typeof AuthorizationStatus;
}

export interface RefreshResponse {
  tokenAccess: string;
  tokenRefresh: string;
  role: keyof typeof AuthorizationStatus;
}
