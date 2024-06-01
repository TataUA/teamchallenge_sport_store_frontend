"use client";

import React from "react";
import { useState } from "react";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

// #CFCFCF /

export const schema = yup.object().shape({
  email: yup
    .string()
    .email("Введіть дійсну електронну адресу")
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Електронна адреса не може містити пробіли"
    )
    .required("Це поле обов'язкове"),
});

export interface LoginFormValues {
  email: string;
}

const initialValues: LoginFormValues = {
  email: "",
};

export const ResetPasswordForm = () => {

    const [showPasswordResetBlock, setShowPasswordResetBlock] = useState<boolean>(false)


  const handleInputChange = (
    fieldName: string,
    fieldValue: string,
    setFieldValue: Function
  ) => {
    setFieldValue(fieldName, fieldValue.trim());
  };

  const handleSubmit = (
    values: LoginFormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    console.log(values);
    resetForm();
  };

  return (
    <>
        <button className="block mb-5" onClick={() => {setShowPasswordResetBlock(true)}}>Забули пароль?</button>
        {showPasswordResetBlock ?
        <div className="absolute w-full h-full top-0 left-0 bg-bluredbackground flex justify-center content-center">
        <div className="self-center bg-mainbackground p-6 rounded-popupborder">
            <div className="flex flex-row gap-y-14">
                <p className="text-subheading">Відновлення паролю</p>
                <p onClick={() => {setShowPasswordResetBlock(false)}}>
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.5 8.5L8.5 17.5" stroke="#3E3E40" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8.5 8.5L17.5 17.5" stroke="#3E3E40" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </p>
            </div>
            <p>Вкажіть свою електронну адресу і ми відправимо вам лист з інструкцією</p>
            <Formik 
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={handleSubmit}
            >
            {(formik) => (
                <Form autoComplete="on">
                <label htmlFor="email" className="block mb-4">
                    Електронна пошта
                    <Field
                    id="email"
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleInputChange(
                        "email",
                        e.target.value,
                        formik.setFieldValue
                        );
                    }}
                    className="block border-b-2"
                    />
                    <ErrorMessage name="email" component="div" />
                </label>

                <button type="submit" className="h-12 border-2">
                    Надіслати інструкцію
                </button>
                </Form>
            )}
            </Formik>
        </div> 
    </div>
    : <></>
    }
    </>
  );
};
