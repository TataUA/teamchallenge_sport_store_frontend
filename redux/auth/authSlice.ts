import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  registerUserThunk,
  loginUserThunk,
  currentUserThunk,
  editUserThunk,
  ErrorType,
  resetPasswordThunk,
  confirmedEmailThunk,
} from "@/redux/auth/authThunk";
import { stat } from "fs";

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
  isAuthenticated: boolean;
  isLoading: boolean;
  isRefreshing: boolean;
  isSubmitingComplete: boolean;
  error: ErrorType | null;
  isAuthModalOpen: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isSubmitingComplete: false,
  isLoading: false,
  isRefreshing: false,
  error: null,
  isAuthModalOpen: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetSubmitingStatus(state) {
      state.isSubmitingComplete = false;
    },
    logoutUser(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    },
    authModalOpen(state) {
      state.isAuthModalOpen = true;
    },
    authModalClose(state) {
      state.isAuthModalOpen = false;
    },
  },
  extraReducers: (builder) =>
    builder
      //register
      .addCase(registerUserThunk.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(registerUserThunk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUserThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload ?? { message: ["An error occurred"] };
      })

      //confirmed email
      .addCase(confirmedEmailThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(confirmedEmailThunk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(confirmedEmailThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload ?? { message: ["An error occurred"] };
      })

      //login
      .addCase(loginUserThunk.pending, (state) => {
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state) => {
        state.isAuthenticated = true;
      })
      .addCase(loginUserThunk.rejected, (state, { payload }) => {
        state.error = payload ?? { message: ["An error occurred"] };
      })

      //current
      .addCase(currentUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        currentUserThunk.fulfilled,
        (state, { payload }: PayloadAction<UserData>) => {
          state.isLoading = false;
          state.isAuthenticated = true;
          state.user = { ...payload };
        },
      )
      .addCase(currentUserThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = payload ?? { message: ["An error occurred"] };
      })

      //edit
      .addCase(editUserThunk.pending, (state) => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(
        editUserThunk.fulfilled,
        (state, { payload }: PayloadAction<UserData>) => {
          state.isRefreshing = false;
          state.user = { ...payload };
        },
      )
      .addCase(editUserThunk.rejected, (state, { payload }) => {
        state.isRefreshing = false;
        state.error = payload ?? { message: ["An error occurred"] };
      })

      //reset
      .addCase(resetPasswordThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPasswordThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isSubmitingComplete = true;
      })
      .addCase(resetPasswordThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload ?? { message: ["An error occurred"] };
      }),
});

export const authReducer = authSlice.reducer;
export const {
  resetSubmitingStatus,
  logoutUser,
  clearError,
  authModalOpen,
  authModalClose,
} = authSlice.actions;
