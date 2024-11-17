import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  registerUser,
  loginUser,
  currentUser,
  editUser,
  logoutUser as apiLogoutUser,
  resetPasswordRequest,
  resetPasswordConfirm,
  resendEmail,
  confirmedEmail,
} from "@/services/api";
import { UserData, logoutUser } from "./authSlice";
import {
  RegisterResponseData,
  LoginResponseData,
} from "@/services/types/auth-api-types";
import { RegisterFormValues } from "@/services/types/auth-form-types";
import { LoginFormValues } from "@/services/types/auth-form-types";
import { UserDataEditFormValues } from "@/components/Auth/EditUser/UserDataEdit";
import { ResetPasswordFormValues } from "@/components/Auth/ResetPassword/ResetPasswordForm";
import { ResetPasswordRequestValues } from "@/components/Auth/ResetPassword/ResetPasswordRequestForm";
import { handleThunkValidationErrors } from "@/helpers/handleThunkValidationErrors";
import { handleSetTokens } from "@/helpers/handleSetTokens";
import { cleanCart } from "../cart/cartSlice";

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
    const errorObject = handleThunkValidationErrors(error);

    return thunkApi.rejectWithValue(errorObject);
  }
});

//confirmation email
export const resendEmailThunk = createAsyncThunk<
  void,
  { email: string },
  { rejectValue: ErrorType }
>("auth/resendEmail", async ({ email }, thunkApi) => {
  try {
    await resendEmail(email);
    return;
  } catch (error: any) {
    const errorObject: ErrorType = {
      message: error.detail || "An error occurred",
    };
    return thunkApi.rejectWithValue(errorObject);
  }
});

export const confirmedEmailThunk = createAsyncThunk<
  void,
  { confirmationToken: string },
  { rejectValue: ErrorType }
>("auth/confirmedEmail", async ({ confirmationToken }, thunkApi) => {
  try {
    await confirmedEmail(confirmationToken);
    return;
  } catch (error: any) {
    const errorObject: ErrorType = {
      message: error.msg || "An error occurred",
    };
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
      message: error.detail || error.msg || "An error occurred",
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
    return thunkApi.rejectWithValue({
      message:
        error.message || "Час дії токену авторизації вийшов. Увійдіть знову.",
    });
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
    const errorObject = handleThunkValidationErrors(error);
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
    thunkApi.dispatch(logoutUser());
    thunkApi.dispatch(cleanCart());
    return;
  } catch (error: any) {
    const errorObject: ErrorType = {
      message: error.detail || "Невідома помилка",
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
    const errorObject = handleThunkValidationErrors(error);

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
    const errorObject = handleThunkValidationErrors(error);

    return thunkApi.rejectWithValue(errorObject);
  }
});
