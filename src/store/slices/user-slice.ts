import { createSlice } from "@reduxjs/toolkit";
import { AuthorizationStatus } from "../../const";
import { checkAuthAction, registerAction, loginAction, confirmAction } from "../api-actions";

type UserState = {
  authorizationStatus: AuthorizationStatus;
}

const initialState: UserState  = {
  authorizationStatus: AuthorizationStatus.Unknown,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem("tokenAccess");
      localStorage.removeItem("tokenRefresh");

      state.authorizationStatus = AuthorizationStatus.NoAuth;
    },
  },
  selectors: {
    getAuthorizationStatus: (store) => store.authorizationStatus,
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
    builder
      .addCase(registerAction.fulfilled, (state, action) => {
        state.authorizationStatus = action.payload;
      })
      .addCase(registerAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
    builder
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
    builder
      .addCase(confirmAction.fulfilled, (state, action) => {
        state.authorizationStatus = action.payload;
      })
      .addCase(confirmAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  }
});

export const { logoutUser } = userSlice.actions;

export const { getAuthorizationStatus } = userSlice.selectors;
