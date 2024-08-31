"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { Formik, Form, FormikHelpers } from "formik";
import { AppDispatch } from "@/redux/store";

import { registerUserThunk } from "@/redux/auth/authThunk";
// import { selectIsRegistrationComplete } from "@/redux/auth/authSelector";

import { InputLabelField } from "@/components/Auth/InputLabelField";
import { Button } from "@/components/Button/Button";
import { handleUserValidationErrors } from "@/helpers/handleUserValidationErrors";

export const schemaRegisterForm = yup.object().shape({
  name: yup
    .string()
    .min(1)
    .matches(
      /^(?!.*[ыёъэЫЁЪЭ])[A-Za-zА-Яа-яЇїІіЄєҐґ']+$/,
      "Це поле може містити лише латинські та українські літери",
    )
    .required("Це поле обов'язкове"),
  surname: yup
    .string()
    .min(1)
    .matches(
      /^(?!.*[ыёъэЫЁЪЭ])[A-Za-zА-Яа-яЇїІіЄєҐґ']+$/,
      "Це поле може містити лише латинські та українські літери",
    )
    .required("Це поле обов'язкове"),
  patronymic: yup
    .string()
    .min(1)
    .matches(
      /^(?!.*[ыёъэЫЁЪЭ])[A-Za-zА-Яа-яЇїІіЄєҐґ']+$/,
      "Це поле може містити лише латинські та українські літери",
    )
    .required("Це поле обов'язкове"),
  phone: yup
    .string()
    .min(13, "Номер повинен містити 13 символів")
    .max(13, "Номер повинен містити 13 символів")
    .matches(
      /^\+380\d{9}$/,
      "Номер телефону повинен бути у форматі +380*********",
    )
    .required("Це поле обов'язкове"),
  email: yup
    .string()
    .email("Введіть дійсну електронну адресу")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Невірний формат адреси електронної пошти",
    )
    .required("Це поле обов'язкове"),
  password: yup
    .string()
    .min(6, "Пароль повинен містити не менше 6 символів")
    .matches(
      /^[A-Za-z0-9!@#$%^&*]+$/,
      "Пароль може містити латинські літери, цифри та символи !@#$%^&*",
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

export const initialValuesRegisterForm: RegisterFormValues = {
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
  const router = useRouter();

  const handleSubmit = async (
    values: RegisterFormValues,
    { resetForm, setErrors }: FormikHelpers<RegisterFormValues>,
  ) => {
    try {
      const actionResult = await dispatch(registerUserThunk(values));

      if (registerUserThunk.fulfilled.match(actionResult)) {
        setPhone("");
        resetForm();
        router.push(`/auth/confirming_letter?email=${values.email}`);
      } else if (registerUserThunk.rejected.match(actionResult)) {
        handleUserValidationErrors(actionResult, setErrors);
      }
    } catch (error) {
      console.error("Registration failed in catch block:", error);
    }
  };

  return (
    <>
      <Formik
        initialValues={{ ...initialValuesRegisterForm, phone }}
        validationSchema={schemaRegisterForm}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form autoComplete="off" className="flex flex-col ">
            <div className="flex flex-col gap-4 mb-8">
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
            </div>
            <Button
              type="submit"
              subtype="primary"
              title="Зареєструватись"
              disabled={formik.isSubmitting}
              styles="mb-2"
            />
          </Form>
        )}
      </Formik>
    </>
  );
};
