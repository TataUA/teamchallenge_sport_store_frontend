import axios from "axios";

// component
import { RegisterFormValues } from "@/components/auth/RegisterForm";
import { LoginFormValues } from "@/components/auth/LoginForm";
import { UserDataEditFormValues } from "@/components/auth/UserDataEdit";
import { ResetPasswordValuesInterface } from "@/components/reset-password/ResetPasswordForm";

// types
import { IProduct } from "./types";

// helpers
import getCorrectQueryParamsSearchQuery from "@/helpers/getCorrectQueryParamsSearchQuery";

export const $instance = axios.create({
  baseURL: "https://api.sporthubsstore.com/",
});

//Token
export const setToken = (token: string) => {
  $instance.defaults.headers["Authorization"] = `Bearer ${token}`;
};

export const clearToken = () => {
  $instance.defaults.headers["Authorization"] = "";
};

//register user
export interface RegisterRequestData {
  first_name: string;
  surname: string;
  last_name: string;
  phone_number: string;
  email: string;
  password: string;
  repeat_password: string;
}

export interface RegisterResponseData {
  id?: number;
  first_name: string;
  surname: string;
  last_name: string;
  phone_number: string;
  email: string;
}

export const registerUser = async (
  values: RegisterFormValues
): Promise<RegisterResponseData> => {
  const { name, surname, patronymic, phone, email, password, repeatPassword } =
    values;

  const requestData: RegisterRequestData = {
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
    const { data } = await $instance.post<RegisterResponseData>(
      "/user/registration/",
      requestData
    );
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

//login user
export interface LoginResponseData {
  access: string;
  // refresh: string;
}

export const loginUser = async (
  values: LoginFormValues
): Promise<LoginResponseData> => {
  const { email, password } = values;

  try {
    const { data } = await $instance.post("/user/login/", { email, password });
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

//current user
export const currentUser = async (): Promise<RegisterResponseData> => {
  try {
    const { data } = await $instance.get("/user/me/");
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

//edit user
export interface EditUserRequestData {
  first_name: string;
  surname: string;
  last_name: string;
  phone_number: string;
  email: string;
}

export const editUser = async (
  values: UserDataEditFormValues
): Promise<RegisterResponseData> => {
  const { name, surname, patronymic, phone, email } = values;

  const requestData: EditUserRequestData = {
    first_name: name,
    surname,
    last_name: patronymic,
    phone_number: phone,
    email,
  };

  try {
    const { data } = await $instance.put<RegisterResponseData>(
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
  await $instance.post("/user/password_reset", {
    email: value,
  });
};

export const validateToken = async (value: string) => {
  await $instance.post("/user/password_reset/validate_token", {
    token: value,
  });
};

export const resetPasswordConfirm = async (
  values: ResetPasswordValuesInterface
) => {
  await $instance.post("/user/password_reset/validate_token", {
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
    const extractedParams = getCorrectQueryParamsSearchQuery(query)
    if(!extractedParams) return []
    
    const { data } = await $instance.get(`products/search/?${extractedParams}`);
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};
