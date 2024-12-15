"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import * as yup from "yup";
import { Formik, Form, FormikErrors, FormikProps } from "formik";

import { AppDispatch } from "@/redux/store";
import { clearError } from "@/redux/auth/authSlice";
import { selectError, selectUserData } from "@/redux/auth/authSelector";
import { currentUserThunk, loginUserThunk } from "@/redux/auth/authThunk";
import { LoginFormValues } from "@/services/types/auth-form-types";
import { useIsMobile } from "@/hooks/useIsMobile";
import { InputLabelField } from "@/components/Auth/InputLabelField";
import { ModalForm } from "@/components/Auth/ModalForm";
import { ResetPasswordRequestForm } from "@/components/Auth/ResetPassword/ResetPasswordRequestForm";
import { Button } from "@/components/Button/Button";
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

interface LoginFormProps {
  setShowModal?: (show: boolean) => void;
  setShowConfirmRegister?: (show: boolean) => void;
  setShowResetPassword?: (show: boolean) => void;
  saveUserEmail?: (email: string) => void;
}

const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

export const LoginForm = (props: LoginFormProps) => {
  const [showModal, setShowModal] = useState(false);

  const currentUser = useSelector(selectUserData);
  const error = useSelector(selectError);

  const dispatch: AppDispatch = useDispatch();

  const router = useRouter();

  const isMobile = useIsMobile();

  useEffect(() => {
    if (error) {
      dispatch(clearError());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentUser) {
      props.setShowModal?.(false);
    }
  }, [currentUser, props]);

  const handleSubmit = async (
    values: LoginFormValues,
    {
      setSubmitting,
    }: {
      setSubmitting: (isSubmitting: boolean) => void;
    },
  ) => {
    try {
      dispatch(clearError());

      const actionResult = await dispatch(loginUserThunk(values));

      if (loginUserThunk.fulfilled.match(actionResult)) {
        await dispatch(currentUserThunk()).unwrap();
        router.push("/auth/profile");
      } else if (loginUserThunk.rejected.match(actionResult)) {
        const errorMessage = actionResult.payload?.message || "";

        if (
          errorMessage ===
          "User not activated, please activate your account by email"
        ) {
          if (!isMobile) {
            props.saveUserEmail?.(values.email);
            props.setShowConfirmRegister?.(true);
          } else {
            router.push(`/auth/confirming_letter?email=${values.email}`);
          }
        }
      }
    } catch (error) {
      console.error("Login failed in catch block:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetPasswordClick = () => {
    if (isMobile) {
      setShowModal(true);
    }
    props.setShowResetPassword?.(true);
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

              <button
                type="button"
                className="block h-8 mt-2 mb-4 text-sm tracking-[0.32px] font-pangram font-medium text-title underline"
                onClick={handleResetPasswordClick}
              >
                Забули пароль?
              </button>

              {error && (
                <div className="flex items-center mb-6">
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
                      : error.message ===
                          "User not activated, please activate your account by email"
                        ? "Ключ активації користувача закінчився. Будь ласка, запросіть новий."
                        : error.message || "Невідома помилка, спробуйте ще раз"}
                  </div>
                </div>
              )}

              <Button
                type="submit"
                subtype="primary"
                title="Увійти"
                disabled={formik.isSubmitting}
              />
            </div>
          </Form>
        )}
      </Formik>

      {showModal && (
        <ModalForm
          onClose={() => setShowModal(false)}
          stylesContentBlock="max-w-[562px]"
        >
          <ResetPasswordRequestForm onReturnClick={() => setShowModal(false)} />
        </ModalForm>
      )}
    </>
  );
};
