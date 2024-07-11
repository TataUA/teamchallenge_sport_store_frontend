"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { Formik, Form, FormikHelpers, FormikErrors } from "formik";
import { AppDispatch } from "@/redux/store";

// thunks
import { loginUserThunk } from "@/redux/auth/authThunk";

// components
import { InputLabelField } from "./InputLabelField";
import { ResetPasswordRequestForm } from "../reset-password/ResetPasswordRequestForm";
import { ResetPasswordButton } from "../reset-password/ResetPasswordButton";

// assets
import wrong from "@/public/icons/wrong.svg";
import saveTokensToCookiesAction from "@/app/actions/saveTokensToCookiesAction";

// actions

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

interface ExtendedFormikErrors extends FormikErrors<LoginFormValues> {
  _error?: string;
}

const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

export const LoginForm = () => {
  const [showPasswordResetBlock, setShowPasswordResetBlock] =
    useState<boolean>(false);

  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (
    values: LoginFormValues,
    { resetForm, setErrors }: FormikHelpers<LoginFormValues>
  ) => {
    try {
      const actionResultAccessToken = await dispatch(loginUserThunk(values));
      const {accessToken, refreshToken} = unwrapResult(actionResultAccessToken);
      saveTokensToCookiesAction({accessToken, refreshToken})
      

      router.push("/profile");
      resetForm();
    } catch (rejectedValueOrSerializedError) {
      const errorMessages: ExtendedFormikErrors = {};

      if (typeof rejectedValueOrSerializedError === "string") {
        if (
          rejectedValueOrSerializedError ===
          "No active account found with the given credentials"
        ) {
          errorMessages._error =
            "Неправильна адреса електронної пошти або пароль";
        } else {
          errorMessages._error = "Невідома помилка, спробуйте ще раз";
        }
      } else {
        errorMessages._error = "Невідома помилка, спробуйте ще раз";
      }

      setErrors(errorMessages);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form autoComplete="off">
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

            {formik.errors &&
              (formik.errors as ExtendedFormikErrors)._error && (
                <div className="flex items-center mb-6 ">
                  <Image
                    src={wrong}
                    width={18}
                    height={18}
                    alt="Іконка помилки"
                  />
                  <div className="ml-1.5 text-sm font-medium text-red">
                    {(formik.errors as ExtendedFormikErrors)._error}
                  </div>
                </div>
              )}

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full h-12 mb-2 px-6  rounded-xl bg-blue text-base font-semibold text-white hover:bg-active_blue transition-all"
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
