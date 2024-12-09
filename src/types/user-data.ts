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
export interface RegisterResponse {
  message: string;
}

export interface LoginResponse {
  tokenAccess: string;
  tokeRefresh: string;
  role: keyof typeof AuthorizationStatus;
}


export interface RefreshResponse {
  tokenAccess: string;
  tokeRefresh: string;
  role: keyof typeof AuthorizationStatus;
}

