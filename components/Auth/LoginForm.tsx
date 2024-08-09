"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { Formik, Form, FormikHelpers, FormikErrors } from "formik";
import { AppDispatch } from "@/redux/store";
import { loginUserThunk } from "@/redux/auth/authThunk";
import { InputLabelField } from "@/components/Auth/InputLabelField";
import { ResetPasswordRequestForm } from "../ResetPassword/ResetPasswordRequestForm";
import { ResetPasswordButton } from "../ResetPassword/ResetPasswordButton";
import wrong from "@/public/icons/wrong.svg";

export const schema = yup.object().shape({
  email: yup
    .string()
    .email("Введіть дійсну електронну адресу")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Невірний формат адреси електронної пошти"
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
      const actionResult = await dispatch(loginUserThunk(values));

      if (loginUserThunk.fulfilled.match(actionResult)) {
        router.push("/profile");
        resetForm();
      } else if (loginUserThunk.rejected.match(actionResult)) {
        let errorData: any = actionResult.payload;
        const errorMessages: ExtendedFormikErrors = {};

        if (errorData && errorData.message) {
          if (
            errorData.message ===
            "No active account found with the given credentials"
          ) {
            errorMessages._error =
              "Неправильна адреса електронної пошти або пароль";
          } else {
            errorMessages._error = "Невідома помилка, спробуйте ще раз";
          }
        } else {
          errorMessages._error = errorData.message;
        }

        setErrors(errorMessages);
      }
    } catch (error) {
      console.error("Login failed in catch block:", error);
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
            <div className="mb-2">
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
                //emailValue={formik.values.email}
                setShowPasswordResetBlock={setShowPasswordResetBlock}
                //showPasswordResetBlock={showPasswordResetBlock}
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
                className="w-full h-12 px-6  rounded-xl bg-blue text-base font-semibold font-pangram text-white hover:bg-active_blue transition-all"
              >
                Увійти
              </button>
            </div>
          </Form>
        )}
      </Formik>
      
      <ResetPasswordRequestForm
        //emailValue={formik.values.email}
        setShowPasswordResetBlock={setShowPasswordResetBlock}
        showPasswordResetBlock={showPasswordResetBlock}
      />
    </>
  );
};
