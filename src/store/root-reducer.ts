import { combineReducers } from '@reduxjs/toolkit';
import { userSlice } from './slices/user-slice';

export const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer
});