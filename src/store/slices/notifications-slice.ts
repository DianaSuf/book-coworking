import { createSlice } from "@reduxjs/toolkit";
import { fetchNotificationsAction } from "../api-actions";
import { INotification } from "../../types/notification-data";

interface NotificationsState {
  notificationFormsFalse: INotification[];
  notificationFormsTrue: INotification[];
  loading: boolean;
  error: string | null | undefined;
}

const initialState: NotificationsState  = {
  notificationFormsFalse: [],
  notificationFormsTrue: [],
  loading: false,
  error: null,
};

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  selectors: {
    getNotificationFormsFalse: (store) => store.notificationFormsFalse,
    getNotificationFormsTrue: (store) => store.notificationFormsTrue,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotificationsAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotificationsAction.fulfilled, (state, action) => {
        if (action.payload) {
          state.notificationFormsFalse = action.payload.notificationFormsFalse;
          state.notificationFormsTrue = action.payload.notificationFormsTrue;
        }
        state.loading = false;
      })
      .addCase(fetchNotificationsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { getNotificationFormsFalse, getNotificationFormsTrue } = notificationsSlice.selectors;

