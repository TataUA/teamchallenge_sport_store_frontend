"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { Formik, Form, FormikHelpers } from "formik";

import { AppDispatch } from "@/redux/store";
import { resetPasswordRequestThunk } from "@/redux/auth/authThunk";
import { useIsMobile } from "@/hooks/useIsMobile";
import { handleUserValidationErrors } from "@/helpers/handleUserValidationErrors";
import { InputLabelField } from "@/components/Auth/InputLabelField";
import { ClientComponent } from "@/components/ClientComponent";
import { Button } from "@/components/Button/Button";
import { ResendLinkButton } from "@/components/Auth/ResendLinkButton";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Введіть дійсну електронну адресу")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Невірний формат адреси електронної пошти",
    )
    .required("Це поле обов'язкове"),
});

interface ResetPasswordRequestProps {
  onReturnClick?: (show: boolean) => void;
  setShowResetPassword?: (show: boolean) => void;
}

export interface ResetPasswordRequestValues {
  email: string;
}

const initialValues: ResetPasswordRequestValues = {
  email: "",
};

export const ResetPasswordRequestForm = (props: ResetPasswordRequestProps) => {
  const [sentForm, setSentForm] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const dispatch: AppDispatch = useDispatch();
  const isMobile = useIsMobile();

  const handleSubmit = async (
    values: ResetPasswordRequestValues,
    { resetForm, setErrors }: FormikHelpers<ResetPasswordRequestValues>,
  ) => {
    try {
      setUserEmail(values.email);

      const actionResult = await dispatch(resetPasswordRequestThunk(values));

      if (resetPasswordRequestThunk.fulfilled.match(actionResult)) {
        resetForm();
        setSentForm(true);
      } else if (resetPasswordRequestThunk.rejected.match(actionResult)) {
        handleUserValidationErrors(actionResult, setErrors);
      }
    } catch (error) {
      console.error("Reset password failed in catch block:", error);
    }
  };

  const handleReturnButtonClick = () => {
    if (isMobile && props.onReturnClick) {
      props.onReturnClick(false);
    } else {
      props.setShowResetPassword?.(false);
    }
  };

  return (
    <>
      <p className="mb-4 text-2xl leading-140 font-pangram font-bold text-title">
        Відновлення паролю
      </p>
      {sentForm === false ? (
        <>
          <p className="mb-6 text-sm leading-129 font-pangram font-medium text-common">
            Вкажіть свою електронну адресу і ми відправимо вам лист з
            інструкцією
          </p>
          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form autoComplete="on">
                <div className="mb-8">
                  <InputLabelField
                    label="Електронна пошта"
                    name="email"
                    type="email"
                    inputMode="email"
                    placeholder="example@gmail.com"
                    formik={formik}
                  />
                </div>

                <Button
                  type="submit"
                  subtype="primary"
                  title="Надіслати інструкцію"
                  onClick={formik.handleSubmit}
                  disabled={formik.isSubmitting}
                />
              </Form>
            )}
          </Formik>

          {!isMobile && (
            <div className="mt-4">
              <Button
                type="button"
                subtype="ghost"
                title="Назад"
                onClick={() => props.setShowResetPassword?.(false)}
              />
            </div>
          )}
        </>
      ) : (
        <div>
          <p className="mb-8 font-pangram">
            Ми надіслали посилання для відновлення на адресу{" "}
            <span className="font-bold">{userEmail}</span>
          </p>

          <div className="w-full flex flex-col gap-4">
            <ClientComponent>
              <ResendLinkButton
                email={userEmail}
                resendButtonTitle="Надіслати посилання ще раз"
                resendThunk={resetPasswordRequestThunk}
              />
            </ClientComponent>

            <Button
              type="button"
              subtype="tertiary"
              title={
                isMobile ? "На сторіку входу" : "Увійти до облікового запису"
              }
              onClick={handleReturnButtonClick}
            />

            <Button
              type="button"
              subtype="ghost"
              title="Назад"
              onClick={() => setSentForm(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};
