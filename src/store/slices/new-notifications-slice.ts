import { createSlice } from "@reduxjs/toolkit";
import { fetchNotificationsCountAction } from "../api-actions";

interface NewNotificationsState {
  countNewNotification: number;
  countExpectationCode: number;
  loading: boolean;
  error: string | null | undefined;
}

const initialState: NewNotificationsState  = {
  countNewNotification: 0,
  countExpectationCode: 0,
  loading: false,
  error: null,
};

export const newNotificationsSlice = createSlice({
  name: 'newNotifications',
  initialState,
  reducers: {},
  selectors: {
    getCountNewNotification: (store) => store.countNewNotification,
    getCountExpectationCode: (store) => store.countExpectationCode,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotificationsCountAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotificationsCountAction.fulfilled, (state, action) => {
        if (action.payload) {
          state.countNewNotification = action.payload.countNewNotification;
          state.countExpectationCode = action.payload.countExpectationCode;
        }
        state.loading = false;
      })
      .addCase(fetchNotificationsCountAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { getCountNewNotification, getCountExpectationCode } = newNotificationsSlice.selectors;

