import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';
// import { getToken } from './token';
import { toast } from 'react-toastify';

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
    (error: AxiosError<DetailMessageType>) => {
      if (error.response) {
        const statusCode = error.response.status;
        
        if (statusCode === 401) {
          console.log('401 ошибка: Unauthorized');
        
        } else if (statusCode === 403) {
          console.log('403 ошибка: Forbidden');
        
        } else if (shouldDisplayError(error.response)) {
          const detailMessage = error.response.data;
          toast.warn(detailMessage.message);
        }
      }

      throw error;
    }
  );

  return api;
};
