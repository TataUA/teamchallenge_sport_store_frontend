// core
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { Formik, Form, FormikHelpers, FormikErrors } from "formik";
import { AppDispatch } from "@/redux/store";

import { registerUserThunk } from "@/redux/auth/authThunk";

// components
import { InputLabelField } from "@/components/Auth/InputLabelField";
import { initialValuesRegisterForm, RegisterFormValues, schemaRegisterForm } from "@/components/Auth/RegisterUser/RegisterForm";


const RegisterSection = () => {
  const [phone, setPhone] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const isRegistrationComplete = false;
  // const isRegistrationComplete = useSelector(selectIsRegistrationComplete);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (isRegistrationComplete) {
      setShowSuccessModal(true);
    }
  }, [isRegistrationComplete]);

  const handleSubmit = async (
    values: RegisterFormValues,
    { resetForm, setErrors }: FormikHelpers<RegisterFormValues>
  ) => {
    try {
      const actionResult = await dispatch(registerUserThunk(values));

      if (registerUserThunk.fulfilled.match(actionResult)) {
        resetForm();
        setPhone("");
        setShowSuccessModal(true);
      } else if (registerUserThunk.rejected.match(actionResult)) {
        let errorData: any = actionResult.payload;
        const errorMessages: Partial<FormikErrors<RegisterFormValues>> = {};

        if (
          errorData &&
          errorData.message &&
          Array.isArray(errorData.message)
        ) {
          if (
            errorData &&
            errorData.message &&
            Array.isArray(errorData.message)
          ) {
            errorData.message.forEach((message: string) => {
              if (message.includes("user with this email already exists.")) {
                errorMessages.email = "Така пошта вже зареєстрована";
              } else if (message.includes("Enter a valid email address.")) {
                errorMessages.email = "Адреса введеної пошти не вірна";
              } else if (
                message.includes("The phone number entered is not valid.")
              ) {
                errorMessages.phone = "Введений номер не вірний";
              } else if (
                message.includes("user with this phone number already exists.")
              ) {
                errorMessages.phone = "Такий номер вже зареєстрований";
              }
            });

            setErrors(errorMessages);
          }
        } else {
          console.error("Registration failed with general error:", errorData);
        }
      }
    } catch (error) {
      console.error("Registration failed in catch block:", error);
    }
  };

  return (
    <>
      <Formik
        initialValues={{ ...initialValuesRegisterForm, phone }}
        validationSchema={schemaRegisterForm}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form autoComplete="off" className="flex flex-col ">
            <div className="flex flex-col gap-4">
              <InputLabelField
                label="Ім'я"
                name="name"
                type="text"
                inputMode="text"
                placeholder=""
                formik={formik}
              />

              <InputLabelField
                label="Прізвище"
                name="surname"
                type="text"
                inputMode="text"
                placeholder=""
                formik={formik}
              />

              <InputLabelField
                label="По-батькові"
                name="patronymic"
                type="text"
                inputMode="text"
                placeholder=""
                formik={formik}
              />

              <InputLabelField
                label="Номер телефону"
                name="phone"
                type="text"
                inputMode="tel"
                placeholder="+380*********"
                formik={formik}
              />

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

              <InputLabelField
                label="Повторити пароль"
                name="repeatPassword"
                type="password"
                inputMode="text"
                placeholder="******"
                formik={formik}
              />
            </div>
            {/* <button
              type="submit"
              disabled={formik.isSubmitting}
              className="h-12 mb-2 px-6 rounded-xl bg-blue text-base font-semibold  text-white hover:bg-active_blue transition-all"
            >
              Зареєструватись
            </button> */}
          </Form>
        )}
      </Formik>

      {/* <SuccessRegisterModal
        showSuccessModal={showSuccessModal}
        setShowSuccessModal={setShowSuccessModal}
      /> */}
    </>
  );
}

export default RegisterSection
