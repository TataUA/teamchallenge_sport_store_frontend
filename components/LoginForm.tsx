"use client";

import React from "react";
//import { useDispatch } from "react-redux";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import { ResetPasswordForm } from "./ResetPasswordForm";
//import { registerUserThunk } from "redux/auth/authThunk";


export const schema = yup.object().shape({
  email: yup
    .string()
    .email("Введіть дійсну електронну адресу")
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Електронна адреса не може містити пробіли"
    )
    .required("Це поле обов'язкове"),
  password: yup
    .string()
    .min(6, "Пароль повинен містити не менше 6 символів")
    .matches(
      /^[A-Za-z0-9!@#$%^&*]+$/,
      "Пароль може містити лише літери, цифри та символи"
    )
    .required("Це поле обов'язкове"),
});

export interface LoginFormValues {
  email: string;
  password: string;
}

const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

export const LoginForm = () => {
  //const dispatch = useDispatch();

  const handleInputChange = (
    fieldName: string,
    fieldValue: string,
    setFieldValue: Function
  ) => {
    setFieldValue(fieldName, fieldValue.trim());
  };

  const handleSubmit = (
    values: LoginFormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    //dispatch(registerUserThunk({ name, email, password }));

    //DELETE
    console.log(values);
    resetForm();
  };

  return (
    <>
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form autoComplete="on">
          <label htmlFor="email" className="block mb-4">
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
              className="block border-b-2"
            />
            <ErrorMessage name="email" component="div" />
          </label>

          <label htmlFor="password" className="block mb-4">
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
              className="block border-b-2"
            />
            <ErrorMessage name="password" component="div" />
          </label>
          {/* <Link href={""} onClick={() => {}} className="block mb-5">
            Забули пароль?
            </Link> */}

          <button type="submit" className="h-12 border-2">
            Увійти
          </button>
        </Form>
      )}
    </Formik>
    <ResetPasswordForm />
    </>
  );
};
