import { AuthState } from "./authSlice";

export const selectUserData = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;
export const selectIsLoading = (state: { auth: AuthState }) =>
  state.auth.isLoading;
export const selectIsRefreshing = (state: { auth: AuthState }) =>
  state.auth.isRefreshing;
export const selectIsSubmitingComplete = (state: { auth: AuthState }) =>
  state.auth.isSubmitingComplete;
export const selectError = (state: { auth: AuthState }) => state.auth.error;
