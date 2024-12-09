import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { APIRoute, AuthorizationStatus, AppRoute } from '../const';
// import { getToken, saveToken, dropToken } from '../services/token';
import { requireAuthorization, redirectToRoute } from './action';

import { AuthRole, RegisterData, LoginData, RegisterResponse, LoginResponse, RefreshData, RefreshResponse } from '../types/user-data';

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const { data: { role } } = await api.get<AuthRole>(APIRoute.Status);
      dispatch(requireAuthorization(AuthorizationStatus[role]));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const registerAction = createAsyncThunk<void, RegisterData, { dispatch: AppDispatch; state: State; extra: AxiosInstance }>(
  'user/register',
  async ({ username, realname, password }, { dispatch, extra: api }) => {
    const { data: { message } } = await api.post<RegisterResponse>(APIRoute.Register, { username, realname, password });
    if (message === 'ok') {
      dispatch(requireAuthorization(AuthorizationStatus.User));
    }
  }
);

export const loginAction = createAsyncThunk<void, LoginData, { dispatch: AppDispatch; state: State; extra: AxiosInstance }>(
  'user/login',
  async ({ username, password }, { dispatch, extra: api }) => {
    const { data: { tokenAccess, tokeRefresh, role } } = await api.post<LoginResponse>(APIRoute.Login, { username, password });
    localStorage.setItem('tokenAccess', tokenAccess);
    localStorage.setItem('tokeRefresh', tokeRefresh);
    dispatch(requireAuthorization(AuthorizationStatus[role]));
    dispatch(redirectToRoute(AppRoute.Profile));
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch}) => {
    localStorage.removeItem("tokenAccess");
    localStorage.removeItem("tokeRefresh");
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);

export const refreshAction = createAsyncThunk<void, RefreshData, { dispatch: AppDispatch; state: State; extra: AxiosInstance }>(
  'user/refresh',
  async ({ token }, { dispatch, extra: api }) => {
    const { data: { tokenAccess, tokeRefresh, role } } = await api.post<RefreshResponse>(APIRoute.Refresh, { token });
    localStorage.setItem('tokenAccess', tokenAccess);
    localStorage.setItem('tokeRefresh', tokeRefresh);
    dispatch(requireAuthorization(AuthorizationStatus[role]));
  }
);

