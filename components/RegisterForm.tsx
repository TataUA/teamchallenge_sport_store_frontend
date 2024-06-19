"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { AppDispatch } from "@/redux/store";
import { registerUserThunk } from "@/redux/auth/authThunk";
import { InputLabelField } from "./InputLabelField";

export const schema = yup.object().shape({
  name: yup
    .string()
    .min(1)
    .matches(/^[A-Za-zА-Яа-яёЇїІіЄєҐґ']+$/, "Це поле може містити лише літери")
    .required("Це поле обов'язкове"),
  surname: yup
    .string()
    .min(1)
    .matches(/^[A-Za-zА-Яа-яЁёЇїІіЄєҐґ']+$/, "Це поле може містити лише літери")
    .required("Це поле обов'язкове"),
  patronymic: yup
    .string()
    .min(1)
    .matches(/^[A-Za-zА-Яа-яЁёЇїІіЄєҐґ']+$/, "Це поле може містити лише літери")
    .required("Це поле обов'язкове"),
  phone: yup
    .string()
    .min(13, "Номер повинен містити 13 символів")
    .max(13, "Номер повинен містити 13 символів")
    .matches(
      /^\+380\d{9}$/,
      "Номер телефону повинен бути у форматі +380*********"
    )
    .required("Це поле обов'язкове"),
  email: yup
    .string()
    .email("Введіть дійсну електронну адресу")
    .required("Це поле обов'язкове"),
  password: yup
    .string()
    .min(6, "Пароль повинен містити не менше 6 символів")
    .matches(
      /^[A-Za-z0-9!@#$%^&*]+$/,
      "Пароль може містити латинські літери, цифри та символи !@#$%^&*"
    )
    .required("Це поле обов'язкове"),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Паролі повинні співпадати")
    .required("Це поле обов'язкове"),
});

export interface RegisterFormValues {
  name: string;
  surname: string;
  patronymic: string;
  phone: string;
  email: string;
  password: string;
  repeatPassword: string;
}

const initialValues: RegisterFormValues = {
  name: "",
  surname: "",
  patronymic: "",
  phone: "",
  email: "",
  password: "",
  repeatPassword: "",
};

export const RegisterForm = () => {
  const [phone, setPhone] = useState("");
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (
    values: RegisterFormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    dispatch(registerUserThunk(values));
    resetForm();
    setPhone("");

    console.log(values); //DELETE
  };

  return (
    <Formik
      initialValues={{ ...initialValues, phone }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form autoComplete="off" className="flex flex-col gap-4">
          <InputLabelField
            label="Ім'я"
            name="name"
            type="text"
            inputMode="text"
            placeholder=""
            formik={formik}
          />

          <InputLabelField
            label="Прізвище"
            name="surname"
            type="text"
            inputMode="text"
            placeholder=""
            formik={formik}
          />

          <InputLabelField
            label="По-батькові"
            name="patronymic"
            type="text"
            inputMode="text"
            placeholder=""
            formik={formik}
          />

          <InputLabelField
            label="Номер телефону"
            name="phone"
            type="text"
            inputMode="tel"
            placeholder="+380*********"
            formik={formik}
          />

          <InputLabelField
            label="Електронна пошта"
            name="email"
            type="email"
            inputMode="email"
            placeholder="example@gmail.com"
            formik={formik}
          />

          <InputLabelField
            label="Пароль"
            name="password"
            type="password"
            inputMode="text"
            placeholder="******"
            formik={formik}
          />

          <InputLabelField
            label="Повторити пароль"
            name="repeatPassword"
            type="password"
            inputMode="text"
            placeholder="******"
            formik={formik}
          />

          <button
            type="submit"
            className="h-12 mb-2 px-6 border border-blue rounded-xl bg-blue text-base font-semibold  text-white hover:bg-white hover:text-blue transition-all"
          >
            Зареєструватись
          </button>
        </Form>
      )}
    </Formik>
  );
};
