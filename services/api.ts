import axios from "axios";

// component
import { RegisterFormValues } from "@/components/Auth/RegisterForm";
import { LoginFormValues } from "@/components/Auth/LoginForm";
import { UserDataEditFormValues } from "@/components/Auth/UserDataEdit";
import { ResetPasswordValuesInterface } from "@/components/ResetPassword/ResetPasswordForm";

// types
import * as types from "./types/auth-api-types";
import { IProduct } from "./types";

// helpers
import getCorrectQueryParamsSearchQuery from "@/helpers/getCorrectQueryParamsSearchQuery";

export const $instance = axios.create({
  //baseURL: "http://34.66.71.139:8000/",
  baseURL: "https://api.sporthubsstore.com/",
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
  }
);

$instance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

//handle token
export const setToken = (token: string) => {
  localStorage.setItem("accessToken", token);
};

export const clearToken = () => {
  localStorage.removeItem("accessToken");
};

//register user
export const registerUser = async (
  values: RegisterFormValues
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

  clearToken();

  try {
    const { data } = await $instance.post<types.RegisterResponseData>(
      "/user/registration/",
      requestData
    );
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

//login user
export const loginUser = async (
  values: LoginFormValues
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
  refresh: string
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
    const { data } = await $instance.get("/user/me/");
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

//edit user
export const editUser = async (
  values: UserDataEditFormValues
): Promise<types.RegisterResponseData> => {
  const { name, surname, patronymic, phone, email } = values;

  const requestData: types.EditUserRequestData = {
    first_name: name,
    surname,
    last_name: patronymic,
    phone_number: phone,
    email,
  };

  try {
    const { data } = await $instance.put<types.RegisterResponseData>(
      "/user/profile/",
      requestData
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

// export const resetPasswordRequest = async (values: ResetPasswordValues) => {
//   await $instance.post('/user/password_reset', {
//     "email": values.resetPasswordEmail
//   })
// };

export const resetPasswordRequest = async (value: string) => {
  await $instance.post("/user/password_reset/", {
    email: value,
  });
};

export const validateToken = async (value: string) => {
  await $instance.post("/user/password_reset/validate_token/", {
    token: value,
  });
};

export const resetPasswordConfirm = async (
  values: ResetPasswordValuesInterface
) => {
  await $instance.post("/user/password_reset/validate_token/", {
    password: values.password,
    token: values.tokenValue,
  });
};

// export const resetPassword = async (values: ) => {
//   await $instance.post('/user/password_reset', {
//     "email": values
//   })
// };

export const sendSearchQueryApi = async (
  query: string
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
