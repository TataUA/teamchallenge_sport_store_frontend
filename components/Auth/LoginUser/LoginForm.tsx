"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { Formik, Form, FormikErrors, FormikProps } from "formik";
import { AppDispatch } from "@/redux/store";
import { clearError } from "@/redux/auth/authSlice";
import { selectError } from "@/redux/auth/authSelector";
import { loginUserThunk } from "@/redux/auth/authThunk";
import { LoginFormValues } from "@/services/types/auth-form-types";
import { InputLabelField } from "@/components/Auth/InputLabelField";
import { ResetPasswordRequestForm } from "@/components/Auth/ResetPassword/ResetPasswordRequestForm";
import { ResetPasswordButton } from "@/components/Auth/ResetPassword/ResetPasswordButton";
import wrong from "@/public/icons/auth/wrong.svg";

export const schema = yup.object().shape({
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
      "Пароль може містити лише літери, цифри та символи",
    )
    .required("Це поле обов'язкове"),
});

export interface ExtendedFormikErrors extends FormikErrors<LoginFormValues> {
  _error?: string;
}

const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

export const LoginForm = () => {
  const [showPasswordResetBlock, setShowPasswordResetBlock] =
    useState<boolean>(false);

  const error = useSelector(selectError);
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    return () => {
      if (error) dispatch(clearError());
    };
  }, [dispatch, error]);

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    try {
      const actionResult = await dispatch(loginUserThunk(values));

      if (loginUserThunk.fulfilled.match(actionResult)) {
        router.push("/profile");
      } else if (loginUserThunk.rejected.match(actionResult)) {
        const errorMessage = actionResult.payload?.message;

        if (
          errorMessage ===
          "User not activated, please activate your account by email"
        ) {
          router.push(`/auth/confirming_letter?email=${values.email}`);
        } else {
          console.error("Unexpected error message:", errorMessage);
        }
      }
    } catch (error) {
      console.error("Login failed in catch block:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {(formik: FormikProps<LoginFormValues>) => (
          <Form autoComplete="on">
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
                  placeholder="Не менше 6 символів"
                  formik={formik}
                />
              </div>

              <ResetPasswordButton
                setShowPasswordResetBlock={setShowPasswordResetBlock}
              />

              {error && (
                <div className="flex items-center mb-6 ">
                  <Image
                    src={wrong}
                    width={18}
                    height={18}
                    alt="Іконка помилки"
                  />
                  <div className="ml-1.5 text-sm font-medium text-red">
                    {error.message ===
                    "No active account found with the given credentials"
                      ? "Неправильна адреса електронної пошти або пароль"
                      : error.message || "Невідома помилка, спробуйте ще раз"}
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
        setShowPasswordResetBlock={setShowPasswordResetBlock}
        showPasswordResetBlock={showPasswordResetBlock}
      />
    </>
  );
};
