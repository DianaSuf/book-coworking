import { createSlice } from "@reduxjs/toolkit";
import { fetchNotificationsCountAction } from "../api-actions";

interface NewNotificationsState {
  count: number;
  loading: boolean;
  error: string | null | undefined;
}

const initialState: NewNotificationsState  = {
  count: 0,
  loading: false,
  error: null,
};

export const newNotificationsSlice = createSlice({
  name: 'newNotifications',
  initialState,
  reducers: {},
  selectors: {
    getNotificationsCount: (store) => store.count,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotificationsCountAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotificationsCountAction.fulfilled, (state, action) => {
        if (action.payload) {
          state.count = action.payload.count;
        }
        state.loading = false;
      })
      .addCase(fetchNotificationsCountAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { getNotificationsCount } = newNotificationsSlice.selectors;

