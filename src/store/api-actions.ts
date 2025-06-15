import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { APIRoute, AuthorizationStatus, AppRoute } from '../const';
import { redirectToRoute } from './action';
import { IAuthRole, IRegisterData, ILoginData, IMessage, IRefreshData, ITokenResponse, IUserData, IRealNameData, IUserNameData, IPassword, IUserDataWithId, IConfirmPassword, IAdminData } from '../types/user-data';
import { IDataBusyTables, IDataReserval, IUserParams, IAdminReserval } from '../types/book-data';
import { INotificationsData  } from '../types/notification-data';
import { IReservalId, IConfirmReserval, IReservalData } from '../types/reservals-data';
import { IDate, IUserReserval, IUserBlock } from '../types/admin-data';
import { INotificationsCount } from '../types/new-notification-data';

export const checkAuthAction = createAsyncThunk<AuthorizationStatus, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data: { role } } = await api.get<IAuthRole>(APIRoute.Status);
      if (AuthorizationStatus.USER === AuthorizationStatus[role]) {
        dispatch(fetchUserDataAction());
      }
      if (AuthorizationStatus.ADMIN === AuthorizationStatus[role]) {
        dispatch(fetchAdminDataAction());
      }
      return AuthorizationStatus[role];
    } catch {
      return AuthorizationStatus.NoAuth;
    }
  },
);

export const registerAction = createAsyncThunk<void, IRegisterData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance
}>(
  'user/register',
  async ({ username, realname, password }, { extra: api }) => {
    await api.post<IMessage>(APIRoute.Register, { username, realname, password });
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
    if (AuthorizationStatus.USER === AuthorizationStatus[role]) {
      dispatch(fetchUserDataAction());
    }
    if (AuthorizationStatus.ADMIN === AuthorizationStatus[role]) {
      dispatch(fetchAdminDataAction());
    }
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

export const fetchNotificationsCountAction = createAsyncThunk<INotificationsCount | null, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/fetchNotificationsCount',
  async (_arg, {extra: api}) => {
    try {
      const { data } = await api.get<INotificationsCount>(APIRoute.NotificationsCount);
      return data;
    } catch {
      return null;
    }
  },
);

export const confirmRegisterAction = createAsyncThunk<
  { authorizationStatus: AuthorizationStatus },
  IMessage,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>(
  'user/confirmRegister',
  async ({ message }, { extra: api }) => {
    const {
      data: { tokenAccess, tokenRefresh, role },
    } = await api.post<ITokenResponse>(APIRoute.ConfirmRegister, { message });

    localStorage.setItem('tokenAccess', tokenAccess);
    localStorage.setItem('tokenRefresh', tokenRefresh);

    return { authorizationStatus: AuthorizationStatus[role] };
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
      const { data } = await api.get<IUserData>(APIRoute.UserProfile);
      return data;
    } catch {
      return null;
    }
  },
);

export const fetchAdminDataAction = createAsyncThunk<IAdminData | null, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/fetchAdminProfile',
  async (_arg, {extra: api}) => {
    try {
      const { data } = await api.get<IAdminData>(APIRoute.AdminProfile);
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
  async ({ realname }, { extra: api }) => {
    const { data: { message } } = await api.post<IMessage>(APIRoute.UpdateUserRealname, { realname });
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

export const confirmPasswordAction = createAsyncThunk<{ authorizationStatus: AuthorizationStatus }, IConfirmPassword, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance
}>(
  'user/confirmPassword',
  async ({ data, password }, { extra: api }) => {
    const { data: { tokenAccess, tokenRefresh, role } } = await api.post<ITokenResponse>(APIRoute.ConfirmPassword, { data, password });
    localStorage.setItem('tokenAccess', tokenAccess);
    localStorage.setItem('tokenRefresh', tokenRefresh);

    return { authorizationStatus: AuthorizationStatus[role] };
  }
);

export const fetchBusyTablesAction = createAsyncThunk<number[], IDataBusyTables, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance
}>(
  'book/fetchBusyTables',
  async ({ date, timeStart, timeEnd }, { extra: api }) => {
    const response = await api.post<number[]>(APIRoute.BusyTables, { date, timeStart, timeEnd });
    return response.data;
  }
);

export const fetchUsersDataAction = createAsyncThunk<IUserDataWithId | IMessage, IUserParams, {
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

export const reservalTablesAction = createAsyncThunk<IMessage, IDataReserval, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance
}>(
  'book/reservalTables',
  async ({ date, timeStart, timeEnd, usernames, tables }, { dispatch, extra: api }) => {
    const { data: { message } } =  await api.post<IMessage>(APIRoute.Reserval, { date, timeStart, timeEnd, usernames, tables });
    await dispatch(fetchNotificationsCountAction());
    return  { message };
  }
);

export const reservalTablesAdminAction = createAsyncThunk<IMessage, IAdminReserval, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance
}>(
  'book/reservalTables',
  async ({ date, timeStart, timeEnd, tables }, { extra: api }) => {
    const { data: { message } } =  await api.post<IMessage>(APIRoute.ReservalAdmin, { date, timeStart, timeEnd, tables });
    return  { message };
  }
);

export const fetchNotificationsAction = createAsyncThunk<INotificationsData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'notifications/fetchNotifications',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const {data} = await api.get(APIRoute.Notifications);
      await dispatch(fetchNotificationsCountAction());
      return data;
    }
    catch {
      return undefined;
    }
  },
);

export const fetchReservalsAction = createAsyncThunk<IReservalData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'reservals/fetchReservals',
  async (_arg, {extra: api}) => {
    try {
      const {data} = await api.get(APIRoute.Reservals);
      return data;
    }
    catch {
      return undefined;
    }
  },
);

export const ConfirmReservalAction = createAsyncThunk<IMessage, IConfirmReserval, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'notifications/confirmReserval',
  async ({ id, code }, {dispatch, extra: api}) => {
    try {
      const { data: { message } } =  await api.post<IMessage>(`${APIRoute.ConfirmReserval}/${id}`, { code });
      await dispatch(fetchReservalsAction());
      return  { message };
    } catch (error) {
      console.error("Ошибка при подтверждении бронирования:", error);
      throw error;
    }
  }
);

export const CancelReservalAction = createAsyncThunk<IMessage, IReservalId, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'notifications/cancelReserval',
  async ({ id }, {dispatch, extra: api}) => {
    try {
      const { data: { message } } = await api.get(`${APIRoute.CancelReserval}/${id}`);
      await dispatch(fetchReservalsAction());
      return { message };
    } catch (error) {
      console.error("Ошибка при отмене бронирования:", error);
      throw error;
    }
  },
);

export const ConfirmReservalGroupAction = createAsyncThunk<IMessage, IReservalId, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'notifications/confirmReserval',
  async ({ id }, { dispatch, extra: api }) => {
    try {
      const { data: { message } } = await api.get<IMessage>(`${APIRoute.ConfirmReservalGroup}/${id}`);
      await dispatch(fetchReservalsAction());
      return { message };
    } catch (error) {
      console.error("Ошибка при подтверждении группового бронирования:", error);
      throw error;
    }
  }
);

export const UnConfirmReservalGroupAction = createAsyncThunk<IMessage, IReservalId, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'notifications/unConfirmReserval',
  async ({ id }, { dispatch, extra: api }) => {
    try {
      const { data: { message } } = await api.get<IMessage>(`${APIRoute.UnConfirmReservalGroup}/${id}`);
      await dispatch(fetchReservalsAction());
      return { message };
    } catch (error) {
      console.error("Ошибка при отклонении группового бронирования:", error);
      throw error;
    }
  }
);

export const SearchDateAction = createAsyncThunk<IUserReserval[], IDate, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance
}>(
  'admin/searchData',
  async ({ date }, { extra: api }) => {
    try {
      const {data} =  await api.post<IUserReserval[]>(APIRoute.SearchData, { date });
      return data;
    } catch (error) {
      console.error("Ошибка при получении списка:", error);
      throw error;
    }
  }
);

export const SearchBlockAction = createAsyncThunk<IUserBlock | IMessage, IUserParams, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'admin/searchBlock',
  async ({ user }, {extra: api}) => {
    try {
      const {data} = await api.get(`${APIRoute.SearchBlock}/${user}`);
      return data;
    }
    catch {
      return undefined;
    }
  },
);

export const BlockUserAction = createAsyncThunk<IMessage, IReservalId, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'admin/blockUser',
  async ({ id }, { extra: api}) => {
    try {
      const { data: { message } } = await api.get(`${APIRoute.BlockUser}/${id}`);
      return { message };
    } catch (error) {
      console.error("Ошибка при получении списка:", error);
      throw error;
    }
  },
);

export const UnblockUserAction = createAsyncThunk<IMessage, IReservalId, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'admin/unblockUser',
  async ({ id }, { extra: api}) => {
    try {
      const { data: { message } } = await api.get(`${APIRoute.UnblockUser}/${id}`);
      return { message };
    } catch (error) {
      console.error("Ошибка при получении списка:", error);
      throw error;
    }
  },
);
