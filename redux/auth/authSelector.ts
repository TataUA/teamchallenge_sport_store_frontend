import { AuthState } from "./authSlice";

export const selectUserData = (state: { auth: AuthState }) => state.auth.user;
export const selectError = (state: { auth: AuthState }) => state.auth.error;
