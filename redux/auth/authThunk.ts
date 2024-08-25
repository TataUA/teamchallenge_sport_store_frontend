import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { UserData, logoutUser } from "./authSlice";
import {
  registerUser,
  loginUser,
  currentUser,
  updateAccessToken,
  editUser,
  logoutUser as apiLogoutUser,
  clearToken,
  resetPasswordRequest,
  resetPasswordConfirm,
} from "@/services/api";
import {
  RegisterResponseData,
  LoginResponseData,
} from "@/services/types/auth-api-types";
import { RegisterFormValues } from "@/components/Auth/RegisterUser/RegisterForm";
import { LoginFormValues } from "@/components/Auth/LoginForm";
import { UserDataEditFormValues } from "@/components/Auth/EditUser/UserDataEdit";
import { ResetPasswordFormValues } from "@/components/Auth/ResetPassword/ResetPasswordForm";
import { handleTokenError } from "@/helpers/handleTokenError";
import { handleValidationErrors } from "@/helpers/handleThunkValidationErrors";
import { handleSetTokens } from "@/helpers/handleSetTokens";
import { ResetPasswordRequestValues } from "@/components/ResetPassword/ResetPasswordRequestForm";

export interface ErrorType {
  message?: string[] | string;
  messages?: { token_class: string; token_type: string; message: string }[];
}

//register
export const registerUserThunk = createAsyncThunk<
  UserData,
  RegisterFormValues,
  { rejectValue: ErrorType }
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
    const errorObject = handleValidationErrors(error);
    return thunkApi.rejectWithValue(errorObject);
  }
});

//login
export const loginUserThunk = createAsyncThunk<
  void,
  LoginFormValues,
  { rejectValue: ErrorType }
>("auth/login", async (values, thunkApi) => {
  try {
    const response: LoginResponseData = await loginUser(values);
    handleSetTokens(response);

    return;
  } catch (error: any) {
    const errorObject: ErrorType = {
      message: error.detail || "An error occurred",
    };

    return thunkApi.rejectWithValue(errorObject);
  }
});

//update token
export const updateAccessTokenThunk = createAsyncThunk<
  void,
  { refreshToken: string },
  { rejectValue: ErrorType }
>("auth/refresh", async (values, thunkApi) => {
  try {
    const response: LoginResponseData = await updateAccessToken(
      values.refreshToken,
    );
    handleSetTokens(response);

    return;
  } catch (error: any) {
    const errorObject: ErrorType = {
      message: error.detail || "An error occurred",
    };

    return thunkApi.rejectWithValue(errorObject);
  }
});

//current
export const currentUserThunk = createAsyncThunk<
  UserData,
  void,
  { rejectValue: ErrorType }
>("auth/current", async (_, thunkApi) => {
  try {
    const response: RegisterResponseData = await currentUser();

    return {
      id: response.id,
      name: response.first_name,
      surname: response.surname,
      patronymic: response.last_name,
      phone: response.phone_number,
      email: response.email,
    };
  } catch (error: any) {
    if (error.detail === "Given token not valid for any token type") {
      const refreshToken = Cookies.get("refreshToken");

      if (refreshToken) {
        try {
          await thunkApi
            .dispatch(updateAccessTokenThunk({ refreshToken }))
            .unwrap();

          const retryResponse: RegisterResponseData = await currentUser();
          return {
            id: retryResponse.id,
            name: retryResponse.first_name,
            surname: retryResponse.surname,
            patronymic: retryResponse.last_name,
            phone: retryResponse.phone_number,
            email: retryResponse.email,
          };
        } catch (refreshError: any) {
          return thunkApi.rejectWithValue({
            message: refreshError.detail || "An error occurred",
          });
        }
      }
    }

    const errorObject: ErrorType = {
      messages: error.messages || [
        {
          token_class: "Unknown",
          token_type: "Unknown",
          message: "An error occurred",
        },
      ],
    };

    return thunkApi.rejectWithValue(errorObject);
  }
});

//edit
export const editUserThunk = createAsyncThunk<
  UserData,
  UserDataEditFormValues,
  { rejectValue: ErrorType }
>("auth/edit", async (values, thunkApi) => {
  try {
    const response: RegisterResponseData = await editUser(values);
    return {
      id: response.id,
      name: response.first_name,
      surname: response.surname,
      patronymic: response.last_name,
      phone: response.phone_number,
      email: response.email,
    };
  } catch (error: any) {
    const tokenErrorHandled = await handleTokenError(error, thunkApi);
    if (tokenErrorHandled) {
      return thunkApi.rejectWithValue(tokenErrorHandled);
    }

    const errorObject = handleValidationErrors(error);
    return thunkApi.rejectWithValue(errorObject);
  }
});

//logout
export const logoutUserThunk = createAsyncThunk<
  void,
  void,
  { rejectValue: ErrorType }
>("auth/logout", async (_, thunkApi) => {
  try {
    await apiLogoutUser();
    clearToken();
    Cookies.remove("refreshToken");
    thunkApi.dispatch(logoutUser());
    return;
  } catch (error: any) {
    const errorObject: ErrorType = {
      message: error.detail || "An error occurred",
    };

    return thunkApi.rejectWithValue(errorObject);
  }
});

//reset password
export const resetPasswordRequestThunk = createAsyncThunk<
  void,
  ResetPasswordRequestValues,
  { rejectValue: ErrorType }
>("auth/resetRequest", async (values, thunkApi) => {
  try {
    await resetPasswordRequest(values);
    return;
  } catch (error: any) {
    const errorObject = handleValidationErrors(error);

    return thunkApi.rejectWithValue(errorObject);
  }
});

export const resetPasswordThunk = createAsyncThunk<
  void,
  ResetPasswordFormValues,
  { rejectValue: ErrorType }
>("auth/resetConfirm", async (values, thunkApi) => {
  try {
    await resetPasswordConfirm(values);
    return;
  } catch (error: any) {
    const errorObject = handleValidationErrors(error);

    return thunkApi.rejectWithValue(errorObject);
  }
});
