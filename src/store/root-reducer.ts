import { combineReducers } from '@reduxjs/toolkit';
import { userSlice } from './slices/user-slice';
import { modalSlice } from './slices/modal-slice';

export const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [modalSlice.name]: modalSlice.reducer
});
