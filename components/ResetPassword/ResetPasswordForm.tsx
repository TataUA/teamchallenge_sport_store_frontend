"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { Formik, Form, FormikHelpers } from "formik";
import { AppDispatch } from "@/redux/store";
import { validateTokenThunk, resetPasswordThunk } from "@/redux/auth/authThunk";

import { InputLabelField } from "@/components/Auth/InputLabelField";
import { Button } from "@/components/Button/Button";
import { SuccessMessageModal } from "../Auth/SuccessMessageModal";

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

interface ResetPasswordFormProps {
  confirmationToken: string;
}

interface ResetPasswordFormValues {
  password: string;
  repeatPassword: string;
  confirmationToken: string;
}

const initialValues: ResetPasswordFormValues = {
  password: "",
  repeatPassword: "",
  confirmationToken: "",
};

export interface ResetPasswordValuesInterface {
  password: string;
  confirmPassword: string;
  tokenValue: string;
}

export const ResetPasswordForm = (props: ResetPasswordFormProps) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  // const isRegistrationComplete = useSelector(selectIsRegistrationComplete);
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (
    values: ResetPasswordFormValues,
    { resetForm, setErrors }: FormikHelpers<ResetPasswordFormValues>,
  ) => {
    try {
      //   const actionResult = await fetchResetPasswordRequest(values);
      // if (resetPasswordRequestThunk.fulfilled.match(actionResult)) {
      //   resetForm();
      //   setSentForm(true);
      // } else if (resetPasswordRequestThunk.rejected.match(actionResult)) {
      //   handleUserValidationErrors(actionResult, setErrors);
      // }
    } catch (error) {
      console.error("Reset password failed in catch block:", error);
    }

    resetForm();

    // const resetPasswordData = {
    //   password: values.password,
    //   confirmPassword: values.confirmPassword,
    //   tokenValue: props.tokenValue,
    // };
    // dispatch(validateTokenThunk(props.tokenValue)).then((error: any) => {
    //   if (!error) {
    //     dispatch(resetPasswordThunk(resetPasswordData)).then((error: any) => {
    //       if (!error) {
    //         // redirect('/success-page')
    //         setShowSuccessMessage(true);
    //       }
    //     });
    //   }
    // });
    // validateToken(props.tokenValue, values.password)
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
        titleButton="На сторінку входу"
        redirectButton={"/login"}
        showSuccessModal={showSuccessModal}
      />
    </>
  );
};
