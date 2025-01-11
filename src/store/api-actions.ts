import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { APIRoute, AuthorizationStatus, AppRoute } from '../const';
import { redirectToRoute } from './action';

import { IAuthRole, IRegisterData, ILoginData, IMessage, IRefreshData, ITokenResponse, IUserData, IRealNameData, IUserNameData, IPassword, IUserDataWithId, FetchUsersDataParams, FetchFreeTablesParams } from '../types/user-data';

export const checkAuthAction = createAsyncThunk<AuthorizationStatus, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    try {
      const { data: { role } } = await api.get<IAuthRole>(APIRoute.Status);
      return AuthorizationStatus[role];
    } catch {
      return AuthorizationStatus.NoAuth;
    }
  },
);

export const registerAction = createAsyncThunk<AuthorizationStatus, IRegisterData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance
}>(
  'user/register',
  async ({ username, realname, password }, { extra: api }) => {
    const { data: { message } } = await api.post<IMessage>(APIRoute.Register, { username, realname, password });
    if (message === 'ok') {
      return AuthorizationStatus.USER;
    }
    return AuthorizationStatus.NoAuth;
  }
);

export const loginAction = createAsyncThunk<AuthorizationStatus, ILoginData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance
}>(
  'user/login',
  async ({ username, password }, { dispatch, extra: api }) => {
    const { data: { tokenAccess, tokenRefresh, role } } = await api.post<ITokenResponse>(APIRoute.Login, { username, password });
    localStorage.setItem('tokenAccess', tokenAccess);
    localStorage.setItem('tokenRefresh', tokenRefresh);
    dispatch(redirectToRoute(AppRoute.Profile));
    return AuthorizationStatus[role];
  }
);

export const refreshAction = createAsyncThunk<void, IRefreshData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance
}>(
  'user/refresh',
  async ({ token }, { dispatch, extra: api }) => {
    const { data: { tokenAccess, tokenRefresh } } = await api.post<ITokenResponse>(APIRoute.Refresh, { token });
    localStorage.setItem('tokenAccess', tokenAccess);
    localStorage.setItem('tokenRefresh', tokenRefresh);
    dispatch(checkAuthAction())
  }
);

export const confirmRegisterAction = createAsyncThunk<AuthorizationStatus, IMessage, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance
}>(
  'user/refresh',
  async ({ message }, { extra: api }) => {
    const { data: { tokenAccess, tokenRefresh, role } } = await api.post<ITokenResponse>(APIRoute.ConfirmRegister, { message });
    localStorage.setItem('tokenAccess', tokenAccess);
    localStorage.setItem('tokenRefresh', tokenRefresh);
    return AuthorizationStatus[role];
  }
);

export const fetchUserDataAction = createAsyncThunk<IUserData | null, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/fetchUserProfile',
  async (_arg, {extra: api}) => {
    try {
      const { data } = await api.get<IUserData>(APIRoute.DataUser);
      return data;
    } catch {
      return null;
    }
  },
);

export const updateUserRealnameAction = createAsyncThunk<IMessage, IRealNameData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance
}>(
  'user/updateUserRealname',
  async ({ realname }, { dispatch, extra: api }) => {
    const { data: { message } } = await api.post<IMessage>(APIRoute.UpdateUserRealname, { realname });
    dispatch(fetchUserDataAction());
    return  { message };
  }
);

export const updateUserPasswordAction = createAsyncThunk<IMessage, IPassword, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance
}>(
  'user/updateUserPassword',
  async ({ oldPassword, newPassword }, { extra: api }) => {
    const { data: { message } } = await api.post<IMessage>(APIRoute.UpdateUserPassword, { oldPassword, newPassword });
    return  { message };
  }
);

export const resetUserPasswordAction = createAsyncThunk<IMessage, IUserNameData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance
}>(
  'user/resetUserData',
  async ({ username }, { extra: api }) => {
    const { data: { message } } = await api.post<IMessage>(APIRoute.ResetUserPassword, { username });
    return  { message };
  }
);

export const fetchFreeTablesAction = createAsyncThunk<number[], FetchFreeTablesParams, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance
}>(
  'book/fetchFreeTables',
  async ({ date, timeStart, timeEnd }, { extra: api }) => {
    const response = await api.post<number[]>(APIRoute.FreeTables, { date, timeStart, timeEnd });
    return  response.data;
  }
);

export const fetchUsersDataAction = createAsyncThunk<IUserDataWithId | IMessage, FetchUsersDataParams, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'book/fetchUsers',
  async ({ user }, {extra: api}) => {
    try {
      const {data} = await api.get(`${APIRoute.SearchUsers}/${user}`);
      return data;
    }
    catch {
      return undefined;
    }
  },
);
