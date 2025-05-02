import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';
import { logoutUser } from '../store/slices/user-slice';
import { store } from '../store';
import { keycloak } from '../keycloak';

const REQUEST_TIMEOUT = 5000;

type DetailMessageType = {
  type: string;
  message: string;
}

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.NOT_FOUND]: true,
  [StatusCodes.OK]: true
};

const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      try {
        if (keycloak.authenticated) {
          const isTokenExpired = keycloak.isTokenExpired();
          if (isTokenExpired) {
            await keycloak.updateToken(30);
          }
          
          if (config.headers) {
            config.headers.Authorization = `Bearer ${keycloak.token}`;
          }
        }
      } catch (error) {
        console.error('Failed to refresh token:', error);
        keycloak.logout();
        store.dispatch(logoutUser());
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<DetailMessageType>) => {
      const originalRequest = error.config;

      if (!originalRequest) {
        throw error;
      }
  
      const statusCode = error.response?.status;

      if (statusCode === 401) {
        const hasToken = !!keycloak.token;

        if (!hasToken || keycloak.isTokenExpired()) {
          store.dispatch(logoutUser());
          return;
        }

        try {
          await keycloak.updateToken(30);
          if (keycloak.token) {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${keycloak.token}`;
            }
            return api(originalRequest);
          }
        } catch (updateError) {
          console.error('Token refresh failed:', updateError);
          keycloak.logout()
          store.dispatch(logoutUser());
        }
      } else if (shouldDisplayError(error.response!)) {
        const detailMessage = error.response!.data;
        toast.warn(detailMessage.message);
      }
  
      throw error;
    }
  );

  return api;
};
