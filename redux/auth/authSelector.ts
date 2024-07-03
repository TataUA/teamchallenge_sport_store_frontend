import { AuthState } from "./authSlice";

export const selectUserData = (state: { auth: AuthState }) => state.auth.user;
export const selectAccessToken = (state: { auth: AuthState }) =>
  state.auth.accessToken;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;
export const selectError = (state: { auth: AuthState }) => state.auth.error;
