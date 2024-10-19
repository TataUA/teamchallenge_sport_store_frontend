import axios from "axios";

// types
import * as types from "@/services/types/auth-api-types";
import { RegisterFormValues } from "@/services/types/auth-form-types";
import { LoginFormValues } from "@/services/types/auth-form-types";
import { UserDataEditFormValues } from "@/components/Auth/EditUser/UserDataEdit";
import { ResetPasswordFormValues } from "@/components/Auth/ResetPassword/ResetPasswordForm";
import { IProduct } from "./types";

// helpers
import getCorrectQueryParamsSearchQuery from "@/helpers/getCorrectQueryParamsSearchQuery";
import { DropdownItemCityNovaPoshta } from "@/components/OrderPageComponent/DeliverSection/CustomCitiesDropdown";
import { ResetPasswordRequestValues } from "@/components/Auth/ResetPassword/ResetPasswordRequestForm";

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

//resend confirmation email
export const resendEmail = async (email: string) => {
  try {
    const { data } = await $instance.post("/user/resend/activation/", {
      email,
    });
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

//confirmed email
export const confirmedEmail = async (confirmationToken: string) => {
  try {
    const { data } = await $instance.post(
      `/user/confirm_email/${confirmationToken}/`,
      confirmationToken,
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
    const response = await $instance.get("/user/view/");

    if(response.data) return response.data
    
    return {

      id: 0,
      first_name: '',
      surname: '',
      last_name: '',
      phone_number: '',
      email: '',
    };
  } catch (error: any) {
    if(error.response.status === 401) {
      localStorage.removeItem('accessToken')
      console.log(error.message);
    }
    throw error.response;
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
  const { password, confirmationToken } = values;

  const requestData: types.resetPasswordConfirmData = {
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

interface INovaPoshtaCityResponse {
  data: {
    data: any[]
  }
}

export interface NovaPoshCityResponseDataItem {
  SettlementTypeDescription: string
  Description: string
  RegionsDescription: string
  AreaDescription: string
  Ref: string
}

export const getListOfCitiesNovaPoshta = async (
  city: string
): Promise< NovaPoshCityResponseDataItem[]> => {
  try {
    const { data }: INovaPoshtaCityResponse = await $instance.get(`/nova-post/settlements/${city}/`);
    
    if(data.data.length) {
      return data.data.filter(item => Number(item.Warehouse) > 0)
    }
    
    return [];
  } catch (error: any) {
    throw error.response.data;
  }
};

interface INovaPoshtaDepartmentsResponse {
  data: {
    data: {Description: string}[]
  }
}

export interface INovaPoshtaDepartmentItemResponse {
  Description: string
}

export const getListOfDepartmentsInCityNovaPoshta = async (
  ref: string
): Promise<INovaPoshtaDepartmentItemResponse[]> => {
  try {
    const { data }: INovaPoshtaDepartmentsResponse = await $instance.get(`/nova-post/warehouses/${ref}/?limit=500`);

    if(data.data.length) {
      return data.data
    }
    return [];
  } catch (error: any) {
    throw error.response.data;
  }
};

export const getListOfStreetsInCityNovaPoshta = async (
  ref: string, street: string
): Promise<any[]> => {
  try {
    const { data }: INovaPoshtaDepartmentsResponse = await $instance.get(`/nova-post/search_streets/${street}/${ref}/?limit=500`);

    if(data.data.length) {
      return data.data
    }
    return [];
  } catch (error: any) {
    throw error.response.data;
  }
};

export interface IOrder {
  basket_id: string
  last_name: string
  first_name: string
  surname: string
  phone_number: string
  email: string
  city: string
  delivery_method: string
  branch: string
  street?: string
  appartment?: string
  payment_method: string
  user: number
}

export const createOrder = async (
  order: IOrder
): Promise<{data: {msg: string, order?: string, payment_form?: string}}> => {
  try {
    const response = await $instance.post('/delivery/orders/create/', order);

    return response

  } catch (error: any) {
    console.log("🚀 ~ error:", error)
    return {data: {msg: error.response.data.msg}};
  }
};
