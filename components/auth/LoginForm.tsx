"use client";

import React, { useState } from "react";
//import { useDispatch } from "react-redux";
import * as yup from "yup";
import { Formik, Form } from "formik";
//import { registerUserThunk } from "redux/auth/authThunk";
import { InputLabelField } from "./InputLabelField";
import { ResetPasswordRequestForm } from "../reset-password/ResetPasswordRequestForm";
import { ResetPasswordButton } from "../reset-password/ResetPasswordButton";

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

export interface LoginFormValues {
  email: string;
  password: string;
}

const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

export const LoginForm = () => {
  const [showPasswordResetBlock, setShowPasswordResetBlock] =
    useState<boolean>(false);
  //const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (
    values: LoginFormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    //dispatch(loginUserThunk(values));
    resetForm();

    console.log(values); //DELETE
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form autoComplete="off" className="">
            <div className="flex flex-col gap-4">
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
            </div>

            <ResetPasswordButton
              setShowPasswordResetBlock={setShowPasswordResetBlock}
              showPasswordResetBlock={showPasswordResetBlock}
            />

            <button
              type="submit"
              className="w-full h-12 mb-2 px-6 border border-blue rounded-xl bg-blue text-base font-semibold text-white hover:bg-white hover:text-blue transition-all"
            >
              Увійти
            </button>
          </Form>
        )}
      </Formik>
      
      <ResetPasswordRequestForm
        setShowPasswordResetBlock={setShowPasswordResetBlock}
        showPasswordResetBlock={showPasswordResetBlock}
      />
    </>
  );
};
