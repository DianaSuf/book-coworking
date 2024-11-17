import {createReducer} from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const';
import { requireAuthorization } from './action';

type InitalState = {
  authorizationStatus: AuthorizationStatus;
}

const initialState: InitalState  = {
  authorizationStatus: AuthorizationStatus.Unknown,
};

export const reducer = createReducer(initialState,  (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
})
