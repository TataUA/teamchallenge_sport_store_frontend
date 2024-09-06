import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  registerUserThunk,
  loginUserThunk,
  currentUserThunk,
  editUserThunk,
  ErrorType,
  updateAccessTokenThunk,
  resetPasswordThunk,
  confirmedEmailThunk,
} from "@/redux/auth/authThunk";

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
}

const initialState: AuthState = {
  user: null,
  isSubmitingComplete: false, //чи потрібно ще? перевірити!
  isAuthenticated: false,
  isLoading: false,
  isRefreshing: false,
  error: null,
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
  },
  extraReducers: (builder) =>
    builder
      //register
      .addCase(registerUserThunk.pending, (state) => {
        state.isRefreshing = true; //Додати лоадер!
        state.error = null;
      })
      .addCase(registerUserThunk.fulfilled, (state) => {
        state.isRefreshing = false;
      })
      .addCase(registerUserThunk.rejected, (state, { payload }) => {
        state.isRefreshing = false;
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

      //update access token
      .addCase(updateAccessTokenThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateAccessTokenThunk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateAccessTokenThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
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
export const { resetSubmitingStatus, logoutUser, clearError } =
  authSlice.actions;
