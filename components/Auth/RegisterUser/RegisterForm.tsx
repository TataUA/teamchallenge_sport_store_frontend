"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { Formik, Form, FormikHelpers, FormikErrors } from "formik";
import { AppDispatch } from "@/redux/store";
import { registerUserThunk } from "@/redux/auth/authThunk";
import { InputLabelField } from "@/components/Auth/InputLabelField";
import { useRouter } from "next/navigation";

export const schema = yup.object().shape({
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
        let errorData: any = actionResult.payload;
        const errorMessages: Partial<FormikErrors<RegisterFormValues>> = {};

        if (
          errorData &&
          errorData.message &&
          Array.isArray(errorData.message)
        ) {
          if (
            errorData &&
            errorData.message &&
            Array.isArray(errorData.message)
          ) {
            console.log("errors:", errorData);
            errorData.message.forEach((message: string) => {
              if (message.includes("user with this email already exists.")) {
                errorMessages.email = "Така пошта вже зареєстрована";
              } else if (message.includes("Enter a valid email address.")) {
                errorMessages.email = "Адреса введеної пошти не вірна";
              } else if (
                message.includes("The phone number entered is not valid.")
              ) {
                errorMessages.phone = "Введений номер не вірний";
              } else if (
                message.includes("user with this phone number already exists.")
              ) {
                errorMessages.phone = "Такий номер вже зареєстрований";
              }
            });

            setErrors(errorMessages);
          }
        } else {
          console.error("Registration failed with general error:", errorData);
        }
      }
    } catch (error) {
      console.error("Registration failed in catch block:", error);
    }
  };

  return (
    <>
      <Formik
        initialValues={{ ...initialValues, phone }}
        validationSchema={schema}
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
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="h-12 mb-2 px-6 rounded-xl bg-blue text-base font-semibold  text-white hover:bg-active_blue transition-all"
            >
              Зареєструватись
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};
