import { combineReducers } from '@reduxjs/toolkit';
import { userSlice } from './slices/user-slice';
import { modalSlice } from './slices/modal-slice';
import { notificationsSlice } from './slices/notifications-slice';
import { reservalsSlice } from './slices/reservals-slice';
import { newNotificationsSlice } from './slices/new-notifications-slice';

export const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [newNotificationsSlice.name]: newNotificationsSlice.reducer,
  [modalSlice.name]: modalSlice.reducer,
  [notificationsSlice.name]: notificationsSlice.reducer,
  [reservalsSlice.name]: reservalsSlice.reducer,
});
