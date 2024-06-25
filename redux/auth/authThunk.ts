import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  registerUser,
  RegisterResponseData,
  loginUser,
  currentUser,
  logoutUser,
  //setToken,
  clearToken,
  resetPasswordRequest,
  validateToken,
  resetPasswordConfirm,
} from "@/services/api";
import { UserData } from "./authSlice";
import { RegisterFormValues } from "@/components/auth/RegisterForm";
import { LoginFormValues } from "@/components/auth/LoginForm";
import { ResetPasswordValuesInterface } from "@/components/reset-password/ResetPasswordForm";

interface Error {
  message: string[];
}

export const registerUserThunk = createAsyncThunk<
  UserData,
  RegisterFormValues,
  { rejectValue: Error }
>("auth/register", async (values, thunkApi) => {
  try {
    const response: RegisterResponseData = await registerUser(values);
    return {
      id: response.id,
      name: response.first_name,
      surname: response.surname,
      patronymic: response.last_name,
      phone: response.phone_number,
      email: response.email,
    };
  } catch (error: any) {
    const errorMessages: string[] = error.phone_number ||
      error.email || ["An error occurred"];
    const errorObject: Error = {
      message: errorMessages,
    };

    return thunkApi.rejectWithValue(errorObject);
  }
});

export const loginUserThunk = createAsyncThunk(
  "auth/login",
  async (values: LoginFormValues, thunkApi) => {
    try {
      const response = await loginUser(values);
      //setToken(response.token);
      return response;
    } catch (error) {
      thunkApi.rejectWithValue({ message: (error as Error).message });
    }
  }
);

export const currentUserThunk = createAsyncThunk(
  "auth/current",
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    //const token = state.auth.token;

    //if (!token) return thunkApi.rejectWithValue(null);
    try {
      //setToken(token);
      const response = await currentUser();
      return response;
    } catch (error) {
      thunkApi.rejectWithValue(null);
    }
  }
);

export const logoutUserThunk = createAsyncThunk(
  "auth/logout",
  async (_, thunkApi) => {
    try {
      const response = await logoutUser();
      clearToken();
      return response;
    } catch (error) {
      thunkApi.rejectWithValue({ message: (error as Error).message });
    }
  }
);

// export const resetPasswordRequestThunk = createAsyncThunk(
//   "reset-password/get-link",
//   async (values: ResetPasswordValues, thunkApi) => {
//     try {
//       const response = await resetPasswordRequest(values);
//       return response;
//     } catch (error) {
//       thunkApi.rejectWithValue({ message: (error as Error).message });
//     }
//   }
// );

export const resetPasswordRequestThunk = createAsyncThunk(
  "reset-password/get-link",
  async (value: string, thunkApi) => {
    try {
      const response = await resetPasswordRequest(value);
      return response;
    } catch (error) {
      thunkApi.rejectWithValue({ message: (error as Error).message });
    }
  }
);

export const validateTokenThunk = createAsyncThunk(
  "reset-password/validate-token",
  async (value: string, thunkApi) => {
    try {
      const response = await validateToken(value);
      return response;
    } catch (error) {
      thunkApi.rejectWithValue({ message: (error as Error).message });
    }
  }
);

export const resetPasswordThunk = createAsyncThunk(
  "reset-password/confirm",
  async (values: ResetPasswordValuesInterface, thunkApi) => {
    try {
      const response = await resetPasswordConfirm(values);
      return response;
    } catch (error) {
      thunkApi.rejectWithValue({ message: (error as Error).message });
    }
  }
);
