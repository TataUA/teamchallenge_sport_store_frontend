import axios from "axios";

// types
import * as types from "./types/auth-api-types";
import { RegisterFormValues } from "@/components/Auth/RegisterUser/RegisterForm";
import { LoginFormValues } from "@/components/Auth/LoginForm";
import { UserDataEditFormValues } from "@/components/Auth/EditUser/UserDataEdit";
import { ResetPasswordRequestValues } from "@/components/ResetPassword/ResetPasswordRequestForm";
import { ResetPasswordFormValues } from "@/components/Auth/ResetPassword/ResetPasswordForm";
import { IProduct } from "./types";

// helpers
import getCorrectQueryParamsSearchQuery from "@/helpers/getCorrectQueryParamsSearchQuery";

export const apiBaseUrl =
  process.env.NODE_ENV === "development"
    ? "http://34.66.71.139:8000/"
    : "https://api.sporthubsstore.com/";

export const $instance = axios.create({
  baseURL: apiBaseUrl,
});

$instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      config.headers["Authorization"] = "";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

$instance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

//handle token
export const setToken = (token: string) => {
  localStorage.setItem("accessToken", token);
};

export const clearToken = () => {
  localStorage.removeItem("accessToken");
};

export const getTokenFromLocalStorage = () =>
  localStorage.getItem("accessToken");

//register user
export const registerUser = async (
  values: RegisterFormValues,
): Promise<types.RegisterResponseData> => {
  const { name, surname, patronymic, phone, email, password, repeatPassword } =
    values;

  const requestData: types.RegisterRequestData = {
    first_name: name,
    surname,
    last_name: patronymic,
    phone_number: phone,
    email,
    password,
    repeat_password: repeatPassword,
  };

  try {
    const { data } = await $instance.post<types.RegisterResponseData>(
      "/user/registration/",
      requestData,
    );
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

//login user
export const loginUser = async (
  values: LoginFormValues,
): Promise<types.LoginResponseData> => {
  const { email, password } = values;

  try {
    const { data } = await $instance.post("/user/login/", { email, password });
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

//update access token
export const updateAccessToken = async (
  refresh: string,
): Promise<types.LoginResponseData> => {
  try {
    const { data } = await $instance.post("/auth/token/refresh/", { refresh });
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

//current user
export const currentUser = async (): Promise<types.RegisterResponseData> => {
  try {
    const { data } = await $instance.get("/user/view/");
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

//edit user
export const editUser = async (
  values: UserDataEditFormValues,
): Promise<types.RegisterResponseData> => {
  const { id, name, surname, patronymic, phone, email } = values;

  const requestData: types.EditUserRequestData = {
    first_name: name,
    surname,
    last_name: patronymic,
    phone_number: phone,
    email,
  };

  try {
    const { data } = await $instance.put<types.RegisterResponseData>(
      `/user/profile/${id}/`,
      requestData,
    );
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

//logout user
export const logoutUser = async () => {
  try {
    const { data } = await $instance.post("/user/logout/");
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

//reset password
export const resetPasswordRequest = async (
  values: ResetPasswordRequestValues,
) => {
  const { email } = values;
  try {
    const { data } = await $instance.post("/user/password_reset/", {
      email,
    });
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

//reset password confirm
export const resetPasswordConfirm = async (
  values: ResetPasswordFormValues,
): Promise<types.resetPasswordConfirmData> => {
  const { password, repeatPassword, confirmationToken } = values;

  const requestData: types.resetPasswordConfirmRequestData = {
    password,
    token: confirmationToken,
  };

  try {
    const { data } = await $instance.post<types.resetPasswordConfirmData>(
      "/user/password_reset/confirm/",
      requestData,
    );
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

//search by query params
export const sendSearchQueryApi = async (
  query: string,
): Promise<IProduct[]> => {
  try {
    const extractedParams = getCorrectQueryParamsSearchQuery(query);
    if (!extractedParams) return [];

    const { data } = await $instance.get(`products/search/?${extractedParams}`);
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};
