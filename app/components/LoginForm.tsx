"use client";

import React from "react";
//import { useDispatch } from "react-redux";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
//import { registerUserThunk } from "redux/auth/authThunk";

export const schema = yup.object().shape({
  email: yup
    .string()
    .email("Введіть дійсну електронну адресу")
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

interface FormValues {
  email: string;
  password: string;
}

const initialValues: FormValues = {
  email: "",
  password: "",
};

export const LoginForm = () => {
  //const dispatch = useDispatch();

  const handleSubmit = (
    values: FormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    //dispatch(registerUserThunk({ name, email, password }));

    //DELETE
    console.log(values);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Form autoComplete="on">
        <label htmlFor="email" className="block mb-4">
          Електронна пошта
          <Field
            id="email"
            type="email"
            name="email"
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
            className="block border-b-2"
          />
          <ErrorMessage name="password" component="div" />
        </label>

        <Link href={""} className="block mb-5">
          Забули пароль?
        </Link>

        <button type="submit" className="h-12 border-2">
          Увійти
        </button>
      </Form>
    </Formik>
  );
};
