import axios from "axios";
import { RegisterFormValues } from "@/components/auth/RegisterForm";
import { LoginFormValues } from "@/components/LoginForm";
import { ResetPasswordValuesInterface } from "@/components/reset-password/ResetPasswordForm";

const $instance = axios.create({
  baseURL: "http://34.66.71.139:8000",
});

//Token
export const setToken = (token: string) => {
  $instance.defaults.headers["Authorization"] = `Bearer ${token}`;
};

export const clearToken = () => {
  $instance.defaults.headers["Authorization"] = "";
};

//User
//register
export interface RequestData {
  first_name: string;
  surname: string;
  last_name: string;
  phone_number: string;
  email: string;
  password: string;
  repeat_password: string;
}

export interface RegisterResponse {
  id?: number;
  first_name: string;
  surname: string;
  last_name: string;
  phone_number: string;
  email: string;
}

export const registerUser = async (
  values: RegisterFormValues
): Promise<RegisterResponse> => {
  const { name, surname, patronymic, phone, email, password, repeatPassword } =
    values;

  const requestData: RequestData = {
    first_name: name,
    surname,
    last_name: patronymic,
    phone_number: phone,
    email,
    password,
    repeat_password: repeatPassword,
  };

  try {
    const { data } = await $instance.post<RegisterResponse>(
      "/user/registration/",
      requestData
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};

//login
export const loginUser = async (values: LoginFormValues) => {
  const { email, password } = values;
  const { data } = await $instance.post("/auth/token/", { email, password });
  return data;
};

export const currentUser = async () => {
  const { data } = await $instance.get("/user/me");
  return data;
};

export const logoutUser = async () => {
  const { data } = await $instance.post("/user/logout/");
  return data;
};


// export const resetPasswordRequest = async (values: ResetPasswordValues) => {
//   await $instance.post('/user/password_reset', {
//     "email": values.resetPasswordEmail
//   })
// };

export const resetPasswordRequest = async (value: string) => {
  await $instance.post('/user/password_reset', {
    "email": value
  })
};

export const validateToken = async (value: string) => {
  await $instance.post('/user/password_reset/validate_token', {
    "token": value,
  })
}

export const resetPasswordConfirm = async (values: ResetPasswordValuesInterface) => {
  await $instance.post('/user/password_reset/validate_token', {
    "password": values.password,
    "token": values.tokenValue
  })
}


// export const resetPassword = async (values: ) => {
//   await $instance.post('/user/password_reset', {
//     "email": values
//   })
// };