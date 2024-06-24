import { AuthState } from "./authSlice";

export const selectUserData = (state: { auth: AuthState }) => state.auth.user;
