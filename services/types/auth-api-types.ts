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

export interface LoginResponseData {
  access: string;
  refresh: string;
}

export interface EditUserRequestData {
  first_name: string;
  surname: string;
  last_name: string;
  phone_number: string;
  email: string;
}

export interface resetPasswordConfirmData {
  password: string;
  token: string;
}

export interface resetPasswordConfirmRequestData {
  password: string;
  token: string;
}
