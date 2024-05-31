"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AppDispatch } from "@/redux/store";
import { registerUserThunk } from "@/redux/auth/authThunk";

export const schema = yup.object().shape({
  name: yup
    .string()
    .min(1, "Це поле не може бути порожнім")
    .matches(/^[A-Za-zА-Яа-яёЇїІіЄєҐґ']+$/, "Це поле може містити лише літери")
    .required("Це поле обов'язкове"),
  surname: yup
    .string()
    .min(1, "Це поле не може бути порожнім")
    .matches(/^[A-Za-zА-Яа-яЁёЇїІіЄєҐґ']+$/, "Це поле може містити лише літери")
    .required("Це поле обов'язкове"),
  patronymic: yup
    .string()
    .min(1, "Це поле не може бути порожнім")
    .matches(/^[A-Za-zА-Яа-яЁёЇїІіЄєҐґ']+$/, "Це поле може містити лише літери")
    .required("Це поле обов'язкове"),
  phone: yup
    .string()
    .min(12, "Номер телефону повинен містити не менше 12 символів")
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
      /^[A-Za-zА-Яа-яЁёЇїІіЄєҐґ0-9!@#$%^&*]+$/,
      "Пароль може містити лише літери, цифри та символи"
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
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const handleInputChange = (
    fieldName: string,
    fieldValue: string,
    setFieldValue: Function
  ) => {
    setFieldValue(fieldName, fieldValue.trim());
  };

  const handleSubmit = (
    values: RegisterFormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    dispatch(registerUserThunk(values));
    resetForm();
    setPhone("");
  };

  return (
    <Formik
      initialValues={{ ...initialValues, phone }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form autoComplete="on" className="flex flex-col gap-4">
          <label
            htmlFor="name"
            className="block text-base font-medium text-label"
          >
            Ім&apos;я
            <Field
              id="name"
              type="text"
              name="name"
              value={formik.values.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleInputChange("name", e.target.value, formik.setFieldValue);
              }}
              className="block w-full border-b"
            />
            <ErrorMessage name="name" component="div" />
          </label>

          <label
            htmlFor="surname"
            className="block text-base font-medium text-label"
          >
            Прізвище
            <Field
              id="surname"
              type="text"
              name="surname"
              value={formik.values.surname}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleInputChange(
                  "surname",
                  e.target.value,
                  formik.setFieldValue
                );
              }}
              className="block w-full border-b"
            />
            <ErrorMessage name="surname" component="div" />
          </label>

          <label
            htmlFor="patronymic"
            className="block text-base font-medium text-label"
          >
            По-батькові
            <Field
              id="patronymic"
              type="text"
              name="patronymic"
              value={formik.values.patronymic}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleInputChange(
                  "patronymic",
                  e.target.value,
                  formik.setFieldValue
                );
              }}
              className="block w-full border-b"
            />
            <ErrorMessage name="patronymic" component="div" />
          </label>

          <label
            htmlFor="phone"
            className="block text-base font-medium text-label"
          >
            Номер телефону
            <Field
              id="phone"
              type="text"
              name="phone"
              className="block w-full border-b"
              value={isPhoneFocused || phone.length > 4 ? phone.trim() : ""}
              onFocus={() => {
                setIsPhoneFocused(true);
                if (!phone.startsWith("+380")) {
                  const newPhone = "+380" + phone.slice(4);
                  setPhone(newPhone);
                  formik.setFieldValue("phone", newPhone);
                }
              }}
              onBlur={() => {
                if (phone === "+380") {
                  setPhone("");
                }
                setIsPhoneFocused(false);
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const inputValue = e.target.value;
                if (inputValue.startsWith("+380") || inputValue === "") {
                  setPhone(inputValue);
                  formik.setFieldValue("phone", inputValue);
                }
              }}
            />
            <ErrorMessage name="phone" component="div" />
          </label>

          <label
            htmlFor="email"
            className="block text-base font-medium text-label"
          >
            Електронна пошта
            <Field
              id="email"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleInputChange(
                  "email",
                  e.target.value,
                  formik.setFieldValue
                );
              }}
              className="block w-full border-b"
            />
            <ErrorMessage name="email" component="div" />
          </label>

          <label
            htmlFor="password"
            className="block text-base font-medium text-label"
          >
            Пароль
            <Field
              autoComplete="off"
              id="password"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleInputChange(
                  "password",
                  e.target.value,
                  formik.setFieldValue
                );
              }}
              className="block w-full border-b"
            />
            <ErrorMessage name="password" component="div" />
          </label>

          <label
            htmlFor="repeatPassword"
            className="block text-base font-medium text-label"
          >
            Повторити пароль
            <Field
              autoComplete="off"
              id="repeatPassword"
              type="password"
              name="repeatPassword"
              className="block w-full border-b"
            />
            <ErrorMessage name="repeatPassword" component="div" />
          </label>

          <button type="submit" className="h-12 border-2">
            Зареєструватись
          </button>
        </Form>
      )}
    </Formik>
  );
};
