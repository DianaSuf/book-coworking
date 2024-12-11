import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';
// import { getToken } from './token';
import { toast } from 'react-toastify';
import { RefreshResponse } from '../types/user-data';
import { APIRoute } from '../const';

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
    (response) => response, // Обработка успешного ответа
    async (error: AxiosError<DetailMessageType>) => {
      const originalRequest = error.config; // Исходный запрос
      console.log('401 ошибка: Unauthorized');

      if (!originalRequest) {
        throw error;
      }
  
      const statusCode = error.response?.status;
      console.log('401 ошибка: Unauthorized с response ');
      console.log(statusCode);
  
      // Если получена ошибка 401 (Unauthorized), и токен обновления существует
      if (statusCode === 401) {
        localStorage.removeItem('tokenAccess');
        const tokenRefresh = localStorage.getItem('tokeRefresh');
        if (tokenRefresh) {
          try {
            // Отправляем запрос на обновление токенов
            const { data } = await api.post<RefreshResponse>(APIRoute.Refresh, { token: tokenRefresh });
  
            // Сохраняем новые токены
            localStorage.setItem('tokenAccess', data.tokenAccess);
            localStorage.setItem('tokeRefresh', data.tokeRefresh);
  
            // Обновляем Authorization заголовок с новым токеном и повторяем запрос
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${data.tokenAccess}`;
            }
  
            return api(originalRequest); // Повторяем исходный запрос с новым токеном
          } catch (refreshError) {
            // Если обновление токенов не удалось, очищаем их
            localStorage.removeItem('tokenAccess');
            toast.error('Сессия истекла. Пожалуйста, войдите снова.');
            throw refreshError;
          }
        } else {
          // Если токен обновления отсутствует, очищаем старые токены и перенаправляем на авторизацию
          localStorage.removeItem('tokenAccess');
          toast.error('Не удалось обновить сессию. Пожалуйста, войдите снова.');
          throw error;
        }
      }
  
      // Обработка других ошибок
      if (statusCode === 403) {
        console.log('403 ошибка: Forbidden');
        localStorage.removeItem('tokenAccess');
        localStorage.removeItem('tokeRefresh');
      } else if (shouldDisplayError(error.response!)) {
        const detailMessage = error.response!.data;
        toast.warn(detailMessage.message);
      }
  
      throw error;
    }
  );

  return api;
};
