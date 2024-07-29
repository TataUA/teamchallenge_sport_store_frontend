import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  registerUserThunk,
  loginUserThunk,
  currentUserThunk,
  editUserThunk,
  ErrorType,
  updateAccessTokenThunk,
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
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isRefreshing: boolean;
  error: ErrorType | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,
  isRefreshing: false,
  error: null,
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
    updateAccessToken(state, action: PayloadAction<{ accessToken: string }>) {
      state.accessToken = action.payload.accessToken;
    },
    logoutUser(state) {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) =>
    builder
      //register
      .addCase(registerUserThunk.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(
        registerUserThunk.fulfilled,
        (state, { payload }: PayloadAction<UserData>) => {
          state.isLoading = false;
        }
      )
      .addCase(registerUserThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload ?? { message: ["An error occurred"] };
      })

      //login
      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = true;
      })
      .addCase(loginUserThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
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
        }
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
        }
      )
      .addCase(editUserThunk.rejected, (state, { payload }) => {
        state.isRefreshing = false;
        state.error = payload ?? { message: ["An error occurred"] };
      }),
});

export const authReducer = authSlice.reducer;
export const { setAccessToken, updateAccessToken, logoutUser } =
  authSlice.actions;
