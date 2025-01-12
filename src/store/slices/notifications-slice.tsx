import { createSlice } from "@reduxjs/toolkit";
import { fetchNotificationsAction } from "../api-actions";
import { IReserval, INotification } from "../../types/user-data";

interface NotificationsState {
  reservals: IReserval[];
  todayNotifications: INotification[];
  last7DaysNotifications: INotification[];
  lastMonthNotifications: INotification[];
  loading: boolean;
  error: string | null | undefined;
}

const initialState: NotificationsState  = {
  reservals: [],
  todayNotifications: [],
  last7DaysNotifications: [],
  lastMonthNotifications: [],
  loading: false,
  error: null,
};

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  selectors: {
    getReservals: (store) => store.reservals,
    getNotificationsToday: (store) => store.todayNotifications,
    getNotificationsWeek: (store) => store.last7DaysNotifications,
    getNotificationsMonth: (store) => store.lastMonthNotifications,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotificationsAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotificationsAction.fulfilled, (state, action) => {
        if (action.payload) {
          state.reservals = action.payload.reservals;
          state.todayNotifications = action.payload.todayNotifications;
          state.last7DaysNotifications = action.payload.last7DaysNotifications;
          state.lastMonthNotifications = action.payload.lastMonthNotifications;
        }
        state.loading = false;
      })
      .addCase(fetchNotificationsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { getReservals, getNotificationsToday, getNotificationsWeek, getNotificationsMonth } = notificationsSlice.selectors;

