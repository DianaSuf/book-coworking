import { createSlice } from "@reduxjs/toolkit";
import { AuthorizationStatus } from "../../const";
import { IUserData, IAdminData } from "../../types/user-data";
import { checkAuthAction, loginAction, confirmRegisterAction, fetchUserDataAction, confirmPasswordAction, fetchAdminDataAction } from "../api-actions";

type UserState = {
  authorizationStatus: AuthorizationStatus;
  userData: IUserData  | null | IAdminData;
}

const initialState: UserState  = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem("tokenAccess");
      localStorage.removeItem("tokenRefresh");

      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.userData = null;
    },
  },
  selectors: {
    getAuthorizationStatus: (store) => store.authorizationStatus,
    getUserData: (store) => store.userData,
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
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
    builder
      .addCase(confirmRegisterAction.fulfilled, (state, action) => {
        state.authorizationStatus = action.payload.authorizationStatus;
      })
      .addCase(confirmRegisterAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
    builder
      .addCase(confirmPasswordAction.fulfilled, (state, action) => {
        state.authorizationStatus = action.payload.authorizationStatus;
      })
      .addCase(confirmPasswordAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
    builder
      .addCase(fetchUserDataAction.fulfilled, (state, action) => {
        state.userData = action.payload;
      })
      .addCase(fetchUserDataAction.rejected, (state) => {
        state.userData = null;
      });
    builder
      .addCase(fetchAdminDataAction.fulfilled, (state, action) => {
        state.userData = action.payload;
      })
      .addCase(fetchAdminDataAction.rejected, (state) => {
        state.userData = null;
      });
  }
});

export const { logoutUser } = userSlice.actions;

export const { getAuthorizationStatus, getUserData } = userSlice.selectors;
