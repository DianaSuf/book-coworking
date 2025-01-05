import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';
import { ITokenResponse } from '../types/user-data';
import { APIRoute } from '../const';
import { logoutUser } from '../store/slices/user-slice';
import { store } from '../store'

const BACKEND_URL = 'http://localhost:8080/';
const REQUEST_TIMEOUT = 5000;

type DetailMessageType = {
  type: string;
  message: string;
}

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.NOT_FOUND]: true
};

const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];

export const createAPI = (): AxiosInstance => {
  
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem('tokenAccess');

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
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
        localStorage.removeItem('tokenAccess');
        const tokenRefresh = localStorage.getItem('tokenRefresh');
        if (tokenRefresh) {
          const { data } = await api.post<ITokenResponse>(APIRoute.Refresh, { token: tokenRefresh });

          localStorage.setItem('tokenAccess', data.tokenAccess);
          localStorage.setItem('tokenRefresh', data.tokenRefresh);

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${data.tokenAccess}`;
          }

          return api(originalRequest);
        } 
      }

      if (statusCode === 403) {
        store.dispatch(logoutUser());
      } else if (shouldDisplayError(error.response!)) {
        const detailMessage = error.response!.data;
        toast.warn(detailMessage.message);
      }
  
      throw error;
    }
  );

  return api;
};
