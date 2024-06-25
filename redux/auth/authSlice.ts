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
  //isRefreshing: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,
  //isRefreshing: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      //register
      .addCase(registerUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        registerUserThunk.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          state.isLoading = false;
        }
      )
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload
          ? action.payload.message.join(", ")
          : "An error occurred";
      })

      //login
      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
        state.error = null;
      })
      // .addCase(
      //   loginUserThunk.fulfilled,
      //   (state, { payload }: PayloadAction<>) => {
      //     state.isLoading = false;
      //     state.authentication = true;
      //     state.userData = payload.user;
      //     state.token = payload.token;
      //   }
      // )
      .addCase(loginUserThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        //state.error = payload ? payload.message : "An error occurred";
      })

      //current
      .addCase(currentUserThunk.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
        state.error = null;
      })
      // .addCase(
      //   currentUserThunk.fulfilled,
      //   (state, { payload }: PayloadAction<AuthResponse>) => {
      //     state.isLoading = false;
      //     state.authentication = true;
      //     state.userData = payload;
      //     state.isRefreshing = false;
      //   }
      // )
      .addCase(currentUserThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        //state.error = payload ? payload.message : "An error occurred";
        //state.isRefreshing = false;
      })

      //logout
      .addCase(logoutUserThunk.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
        state.error = null;
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
