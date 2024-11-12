"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import * as yup from "yup";
import { Formik, Form, FormikHelpers } from "formik";

import { AppDispatch } from "@/redux/store";
import { selectIsSubmitingComplete } from "@/redux/auth/authSelector";
import { resetPasswordThunk } from "@/redux/auth/authThunk";
import { useIsMobile } from "@/hooks/useIsMobile";
import { InputLabelField } from "@/components/Auth/InputLabelField";
import { Button } from "@/components/Button/Button";
import { SuccessMessageModal } from "@/components/Auth/SuccessMessageModal";

const schema = yup.object().shape({
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

export interface ResetPasswordFormValues {
  password: string;
  repeatPassword: string;
  confirmationToken: string;
}

const initialValues: ResetPasswordFormValues = {
  password: "",
  repeatPassword: "",
  confirmationToken: "",
};

export const ResetPasswordForm = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const isSubmitingComplete = useSelector(selectIsSubmitingComplete);

  const dispatch: AppDispatch = useDispatch();

  const pathname = usePathname();

  const tokenValue = pathname.substring(21, pathname.length);

  const isMobile = useIsMobile();

  useEffect(() => {
    if (isSubmitingComplete) {
      setShowSuccessModal(true);
    }
  }, [isSubmitingComplete]);

  const handleSubmit = async (
    values: ResetPasswordFormValues,
    { resetForm }: FormikHelpers<ResetPasswordFormValues>,
  ) => {
    try {
      const valuesWithToken = { ...values, confirmationToken: tokenValue };

      const actionResult = await dispatch(resetPasswordThunk(valuesWithToken));

      if (resetPasswordThunk.fulfilled.match(actionResult)) {
        resetForm();
      } else {
        let errorData: any = actionResult.payload;
        console.error("Reset password failed with general error:", errorData);
      }
    } catch (error) {
      console.error("Reset password failed in catch block:", error);
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
            <div className="flex flex-col gap-2 mb-8">
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
              title="Змінити пароль"
              onClick={formik.handleSubmit}
              disabled={formik.isSubmitting}
            />
          </Form>
        )}
      </Formik>

      <SuccessMessageModal
        title="Пароль змінено"
        text="Ваш пароль успішно змінено. Використовуйте новий пароль щоб увійти"
        titleButton={isMobile ? "На сторінку входу" : "На головну сторінку"}
        redirectButton={isMobile ? "/auth/login" : "/"}
        showSuccessModal={showSuccessModal}
      />
    </>
  );
};
