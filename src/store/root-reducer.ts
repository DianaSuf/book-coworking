import { combineReducers } from '@reduxjs/toolkit';
import { userSlice } from './slices/user-slice';
import { modalSlice } from './slices/modal-slice';
import { notificationsSlice } from './slices/notifications-slice';
import { reservalsSlice } from './slices/reservals-slice';

export const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [modalSlice.name]: modalSlice.reducer,
  [notificationsSlice.name]: notificationsSlice.reducer,
  [reservalsSlice.name]: reservalsSlice.reducer,
});
