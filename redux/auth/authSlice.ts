import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  registerUserThunk,
  loginUserThunk,
  currentUserThunk,
  logoutUserThunk,
} from "./authThunk";

export interface UserData {
  id?: number;
  name: string;
  surname: string;
  patronymic: string;
  email: string;
  phone: string;
}

export interface AuthState {
  user: UserData | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isRefreshing: boolean;
  error: string[];
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,
  isRefreshing: false,
  error: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, { payload }: PayloadAction<string | null>) => {
      state.accessToken =
        payload !== "null" && payload !== null
          ? payload.trim().replace(/^"(.*)"$/, "$1")
          : null;
      state.isAuthenticated = !!state.accessToken;
    },
  },
  extraReducers: (builder) =>
    builder
      //register
      .addCase(registerUserThunk.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
        state.error = [];
      })
      .addCase(
        registerUserThunk.fulfilled,
        (state, { payload }: PayloadAction<UserData>) => {
          state.isLoading = false;
        }
      )
      .addCase(registerUserThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        if (payload) {
          payload.message.forEach((item: string) => state.error.push(item));
        }
      })

      //login
      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
        state.error = [];
      })
      .addCase(
        loginUserThunk.fulfilled,
        (state, { payload }: PayloadAction<{ accessToken: string }>) => {
          state.isLoading = false;
          state.isAuthenticated = true;
          state.accessToken = payload.accessToken;
        }
      )
      .addCase(loginUserThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        payload && state.error.push(payload);
      })

      //current
      .addCase(currentUserThunk.pending, (state) => {
        state.isRefreshing = true;
        state.error = [];
      })
      .addCase(
        currentUserThunk.fulfilled,
        (state, { payload }: PayloadAction<UserData>) => {
          state.isRefreshing = false;
          state.isAuthenticated = true;
          state.user = { ...payload };
        }
      )
      .addCase(currentUserThunk.rejected, (state, { payload }) => {
        state.isRefreshing = false;
        state.isAuthenticated = false;
        if (payload) {
          payload.message.forEach((item: string) => state.error.push(item));
        }
      })

      //logout
      .addCase(logoutUserThunk.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
        state.error = [];
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        //state.userData = null;
        //state.token = null;
      })
      .addCase(logoutUserThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        //state.error = payload ? payload.message : "An error occurred";
      }),
});

export const authReducer = authSlice.reducer;
export const { setAccessToken } = authSlice.actions;
