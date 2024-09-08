export interface RegisterFormValues {
  name: string;
  surname: string;
  patronymic: string;
  phone: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}
