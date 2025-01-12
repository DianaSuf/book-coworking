import { combineReducers } from '@reduxjs/toolkit';
import { userSlice } from './slices/user-slice';
import { modalSlice } from './slices/modal-slice';
import { notificationsSlice } from './slices/notifications-slice';

export const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [modalSlice.name]: modalSlice.reducer,
  [notificationsSlice.name]: notificationsSlice.reducer,
});
