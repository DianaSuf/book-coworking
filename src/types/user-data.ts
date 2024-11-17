import { AuthorizationStatus } from "../const";

export interface AuthRole {
  role: keyof typeof AuthorizationStatus;
}
