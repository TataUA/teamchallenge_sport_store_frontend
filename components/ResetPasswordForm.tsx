"use client";

import React from "react";
import { useState } from "react";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";


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

const url = `http://34.66.71.139:8000/user/password_reset/`;

export const ResetPasswordForm = () => {

  const [showPasswordResetBlock, setShowPasswordResetBlock] = useState<boolean>(false);
    
  const [popupContent, setPopupContent] = useState<string>("form");

  const [labelValue, setLabelValue] = useState<string>("");

  const [placeholderValue, setPlaceholderValue] = useState<string>("Електронна пошта");

  const [userEmail, setUserEmail] = useState<string>("");

  const handleInputChange = (
    fieldName: string,
    fieldValue: string,
    setFieldValue: Function
  ) => {
    setFieldValue(fieldName, fieldValue.trim());
  };

  async function postEmailValue(value: string) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({"email": value}),
      });
  
      const result = await response.json();
      console.log("Success:", result);
      setUserEmail(value);
      setPopupContent("success message")
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleSubmit = (
    values: LoginFormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    console.log(values.email);
    resetForm();
    postEmailValue(values.email);
  };

  return (
    <>
      <button className="block mb-5" onClick={() => {setShowPasswordResetBlock(true)}}>Забули пароль?</button>
        {showPasswordResetBlock ?
        <div className="fixed w-full h-screen top-0 left-0 flex justify-center content-center bg-blured">
        <div className="self-center bg-white p-6 rounded-popup max-w-[88vw] max-h-[88vw] text-common text-basic font-medium">
            <div className="flex flex-row justify-between items-center mb-4">
                <p className="text-subheading text-title font-bold">Відновлення паролю</p>
                <p onClick={() => {setShowPasswordResetBlock(false)}}>
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.5 8.5L8.5 17.5" stroke="#3E3E40" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8.5 8.5L17.5 17.5" stroke="#3E3E40" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </p>
            </div>
            { popupContent === "form" ? 
            <>
              <p className="mb-4">Вкажіть свою електронну адресу, і ми відправимо вам лист з інструкцією</p>
              <Formik 
              initialValues={initialValues}
              validationSchema={schema}
              onSubmit={handleSubmit}
              >
              {(formik) => (
                  <Form autoComplete="on">
                  <label htmlFor="email" className="block mb-4">
                      {labelValue}
                      <Field
                      id="email"
                      type="email"
                      name="email"
                      placeholder={placeholderValue}
                      value={formik.values.email}
                      onFocus={() => {setLabelValue("Електронна пошта"); setPlaceholderValue("")}}
                      onBlur={() => {setLabelValue(""); setPlaceholderValue("Електронна пошта")}}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          handleInputChange(
                          "email",
                          e.target.value,
                          formik.setFieldValue
                          );
                      }}
                      className="block border-b-2 pb-2 w-full mb-8 focus:outline-none"
                      />
                      <ErrorMessage name="email" component="div" />
                  </label>

                  <button type="submit" className="h-12 text-button bg-blue rounded-button text-white w-full font-semibold">
                      Надіслати інструкцію
                  </button>
                  </Form>
              )}
              </Formik>
              </>
              : 
              <div>
                <p className="mb-4">Ми надіслали посилання для відновлення на адресу {userEmail}</p>
                <button className="my-4 h-12 text-button bg-blue rounded-button text-white w-full font-semibold mb-4" onClick={() => {setShowPasswordResetBlock(false)}}>На сторінку входу</button>
                <button className="h-12 text-button bg-white rounded-button w-full font-semibold border-2" onClick={() => {postEmailValue(userEmail)}}>Надіслати посилання ще раз</button>
              </div>
            }
        </div> 
    </div>
    : <></>
    }
    </>
  );
};
