import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { APIRoute, AuthorizationStatus, AppRoute } from '../const';
// import { getToken, saveToken, dropToken } from '../services/token';
import { redirectToRoute } from './action';

import { AuthRole, RegisterData, LoginData, RegisterResponse, LoginResponse, RefreshData, RefreshResponse, ConfirmData, ConfirmResponse } from '../types/user-data';

export const checkAuthAction = createAsyncThunk<AuthorizationStatus, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    try {
      const { data: { role } } = await api.get<AuthRole>(APIRoute.Status);
      return AuthorizationStatus[role];
    } catch {
      return AuthorizationStatus.NoAuth;
    }
  },
);

export const registerAction = createAsyncThunk<AuthorizationStatus, RegisterData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance
}>(
  'user/register',
  async ({ username, realname, password }, { extra: api }) => {
    const { data: { message } } = await api.post<RegisterResponse>(APIRoute.Register, { username, realname, password });
    if (message === 'ok') {
      return AuthorizationStatus.USER;
    }
    return AuthorizationStatus.NoAuth;
  }
);

export const loginAction = createAsyncThunk<AuthorizationStatus, LoginData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance
}>(
  'user/login',
  async ({ username, password }, { dispatch, extra: api }) => {
    const { data: { tokenAccess, tokenRefresh, role } } = await api.post<LoginResponse>(APIRoute.Login, { username, password });
    localStorage.setItem('tokenAccess', tokenAccess);
    localStorage.setItem('tokenRefresh', tokenRefresh);
    dispatch(redirectToRoute(AppRoute.Profile));
    return AuthorizationStatus[role];
  }
);

export const refreshAction = createAsyncThunk<void, RefreshData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance
}>(
  'user/refresh',
  async ({ token }, { dispatch, extra: api }) => {
    const { data: { tokenAccess, tokenRefresh } } = await api.post<RefreshResponse>(APIRoute.Refresh, { token });
    localStorage.setItem('tokenAccess', tokenAccess);
    localStorage.setItem('tokenRefresh', tokenRefresh);
    dispatch(checkAuthAction())
  }
);

export const confirmAction = createAsyncThunk<AuthorizationStatus, ConfirmData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance
}>(
  'user/refresh',
  async ({ message }, { extra: api }) => {
    const { data: { tokenAccess, tokenRefresh, role } } = await api.post<ConfirmResponse>(APIRoute.Confirm, { message });
    localStorage.setItem('tokenAccess', tokenAccess);
    localStorage.setItem('tokenRefresh', tokenRefresh);
    return AuthorizationStatus[role];
  }
);
