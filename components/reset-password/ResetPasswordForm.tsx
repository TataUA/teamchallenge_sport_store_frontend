"use client";

import React from "react";
import { redirect } from 'next/navigation'
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { submitButtonClassName } from "./ResetPasswordRequestForm";


const schema = yup.object().shape({
  password: yup
    .string()
    .min(6, "Пароль повинен містити не менше 6 символів")
    .matches(
      /^[A-Za-z0-9!@#$%^&*]+$/,
      "Пароль може містити лише літери, цифри та символи"
    )
    .required("Це поле обов'язкове"),
    confirmPassword: yup
    .string()
    .min(6, "Пароль повинен містити не менше 6 символів")
    .matches(
        /^[A-Za-z0-9!@#$%^&*]+$/,
        "Пароль може містити лише літери, цифри та символи"
      )
    .required("Це поле обов'язкове")
    .test('passwords-match', 'Паролі не співпадають', function (value) {return this.parent.password === value})
});

interface PasswordConfirmationValues {
  password: string;
  confirmPassword: string;
}

const initialValues: PasswordConfirmationValues = {
  password: "",
  confirmPassword: "",
};

interface Props {
    tokenValue: string
  }

export const ResetPasswordForm = (props: Props) => {

  const [passwordLabelClassname, setPasswordLabelClassname] = useState<string>("text-transparent");

  const [confirmPasswordLabelClassname, setConfirmPasswordLabelClassname] = useState<string>("text-transparent");

  const [passwordPlaceholderValue, setPasswordPlaceholderValue] = useState<string>("Пароль");

  const [confirmPasswordPlaceholderValue, setConfirmPasswordPlaceholderValue] = useState<string>("Підтвердити пароль");

  const [iconSymbolValue, setIconSymbolValue] = useState<string>("");

  const [confirmIconSymbolValue, setConfirmIconSymbolValue] = useState<string>("");

  const errorStyles = "text-red text-error font-medium";

  const validateTokenUrl = "http://34.66.71.139:8000/user/password_reset/validate_token/";

  const resetPasswordUrl = "http://34.66.71.139:8000/user/password_reset/confirm/";


  async function confirmResetPassword (tokenValue: string, passwordValue: string) {
    try {
      const response = await fetch(resetPasswordUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
                "password": passwordValue,
                "token": tokenValue
            }),
      });
      const result = await response.json();
      console.log("Success:", result, response.status);
      if (response.status === 200) {
        redirect('/success-page')
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }


  async function validateToken(value: string, password: string) {
    try {
      const response = await fetch(validateTokenUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({"token": value}),
      });
      const result = await response.json();
      console.log("Success:", result, response.status);
      if (response.status === 200) {
        confirmResetPassword(value, password)
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }


  const handleInputChange = (
    fieldName: string,
    fieldValue: string,
    setFieldValue: Function
  ) => {
    setFieldValue(fieldName, fieldValue.trim()); 
  };

  const handleSubmit = (
    values: PasswordConfirmationValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    console.log(values);
    resetForm();
    setConfirmIconSymbolValue("");
    setIconSymbolValue("");
    validateToken(props.tokenValue, values.password)

  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form autoComplete="off" className="text-button font-medium">
            <div className="flex flex-col gap-y-2 mb-8">
                <label htmlFor="password" 
                className={`${iconSymbolValue !== "Correct mark" ? iconSymbolValue === "Wrong mark" ? "text-red" : "" : "text-green"}`}
                >
                    <span className={`text-basic ${passwordLabelClassname}`}>Пароль</span>
                    <div className={`flex flex-row justify-between items-top border-b-2 ${iconSymbolValue !== "Correct mark" ? iconSymbolValue === "Wrong mark" ? "border-red" : "" : "border-green"}`}>
                        <Field
                        className="h-13 w-full placeholder:text-button focus:outline-none pb-2 text-label text-basic"
                        id="password"
                        type="password"
                        name="password"
                        placeholder={passwordPlaceholderValue}
                        value={formik.values.password}
                        onFocus={() => {setPasswordLabelClassname(""); setPasswordPlaceholderValue("Має містити мінімум 6 знаків")}}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            handleInputChange(
                            "password",
                            e.target.value,
                            formik.setFieldValue
                            );
                            e.target.value.length >= 6 ?  formik.values.confirmPassword.length >=6 ? formik.values.confirmPassword !== e.target.value ? (setConfirmIconSymbolValue("Wrong mark"), setIconSymbolValue("Wrong mark")) : (setConfirmIconSymbolValue("Correct mark"), setIconSymbolValue("Correct mark")) : setIconSymbolValue("Correct mark") : formik.values.confirmPassword === "" ? setIconSymbolValue("") : (setIconSymbolValue(""), setConfirmIconSymbolValue("Wrong mark"));
                        }}
                        />
                        {
                            iconSymbolValue === "Correct mark" ?
                            <svg className="ml-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M11.9995 21C13.6254 21.0001 15.2209 20.5598 16.6166 19.7259C18.0123 18.8919 19.1561 17.6955 19.9263 16.2636C20.6965 14.8318 21.0645 13.218 20.9911 11.5938C20.9177 9.96956 20.4057 8.39556 19.5095 7.039L12.3545 14.989C12.0203 15.3604 11.5592 15.5933 11.0619 15.6418C10.5646 15.6903 10.0672 15.5509 9.66752 15.251L6.39952 12.8C6.18734 12.6409 6.04707 12.404 6.00957 12.1414C5.97206 11.8789 6.04039 11.6122 6.19952 11.4C6.35865 11.1878 6.59554 11.0476 6.8581 11.0101C7.12065 10.9725 7.38734 11.0409 7.59952 11.2L10.8675 13.651L18.2135 5.49C17.1493 4.47411 15.8523 3.7346 14.436 3.33622C13.0197 2.93784 11.5274 2.89274 10.0896 3.20487C8.6519 3.517 7.31259 4.17684 6.18899 5.12661C5.06539 6.07639 4.19176 7.28713 3.64459 8.65284C3.09743 10.0185 2.89342 11.4976 3.05042 12.9604C3.20742 14.4233 3.72064 15.8253 4.54516 17.0438C5.36967 18.2623 6.48033 19.2601 7.77989 19.9498C9.07945 20.6395 10.5283 21.0001 11.9995 21Z" fill="#42BE65"/>
                            </svg>
                            : iconSymbolValue === "Wrong mark" ?
                            <svg className="ml-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.2898 3.85996L1.81978 18C1.64514 18.3024 1.55274 18.6453 1.55177 18.9945C1.55079 19.3437 1.64127 19.6871 1.8142 19.9905C1.98714 20.2939 2.2365 20.5467 2.53748 20.7238C2.83847 20.9009 3.18058 20.9961 3.52978 21H20.4698C20.819 20.9961 21.1611 20.9009 21.4621 20.7238C21.7631 20.5467 22.0124 20.2939 22.1854 19.9905C22.3583 19.6871 22.4488 19.3437 22.4478 18.9945C22.4468 18.6453 22.3544 18.3024 22.1798 18L13.7098 3.85996C13.5315 3.56607 13.2805 3.32308 12.981 3.15444C12.6814 2.98581 12.3435 2.89722 11.9998 2.89722C11.656 2.89722 11.3181 2.98581 11.0186 3.15444C10.7191 3.32308 10.468 3.56607 10.2898 3.85996V3.85996Z" stroke="#DF0707" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M12 9V13" stroke="#DF0707" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M12 17H12.01" stroke="#DF0707" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            : 
                            <></>
                        }
                    </div>
                    <ErrorMessage className={errorStyles} name="password" component="div" />
                </label>

                <label htmlFor="confirmPassword"
                className={`${confirmIconSymbolValue !== "Correct mark" ? confirmIconSymbolValue === "Wrong mark" ? "text-red" : "" : "text-green"}`}
                >
                    <span className={`text-basic ${confirmPasswordLabelClassname}`}>Підтвердити пароль</span>
                    <div className={`flex flex-row justify-between items-top border-b-2 ${confirmIconSymbolValue !== "Correct mark" ? confirmIconSymbolValue === "Wrong mark" ? "border-red" : "" : "border-green"}`}>
                        <Field
                        className="h-13 w-full placeholder:text-button focus:outline-none pb-2 text-label text-basic"
                        autoComplete="off"
                        id="confirmPassword"
                        type="password"
                        name="confirmPassword"
                        placeholder={confirmPasswordPlaceholderValue}
                        value={formik.values.confirmPassword}
                        onFocus={() => {setConfirmPasswordLabelClassname(""); setConfirmPasswordPlaceholderValue("Має містити мінімум 6 знаків")}}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            handleInputChange(
                            "confirmPassword",
                            e.target.value,
                            formik.setFieldValue
                            );
                            e.target.value.length >= 6 ?  formik.values.password.length >=6 ? formik.values.password !== e.target.value ? (setConfirmIconSymbolValue("Wrong mark"), setIconSymbolValue("Wrong mark")) : (setConfirmIconSymbolValue("Correct mark"), setIconSymbolValue("Correct mark")) : setConfirmIconSymbolValue("") : formik.values.password !== "" ? (setConfirmIconSymbolValue(""), setIconSymbolValue("Correct mark")) : setConfirmIconSymbolValue("");
                        }}
                        />
                        {
                            confirmIconSymbolValue === "Correct mark" ?
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M11.9995 21C13.6254 21.0001 15.2209 20.5598 16.6166 19.7259C18.0123 18.8919 19.1561 17.6955 19.9263 16.2636C20.6965 14.8318 21.0645 13.218 20.9911 11.5938C20.9177 9.96956 20.4057 8.39556 19.5095 7.039L12.3545 14.989C12.0203 15.3604 11.5592 15.5933 11.0619 15.6418C10.5646 15.6903 10.0672 15.5509 9.66752 15.251L6.39952 12.8C6.18734 12.6409 6.04707 12.404 6.00957 12.1414C5.97206 11.8789 6.04039 11.6122 6.19952 11.4C6.35865 11.1878 6.59554 11.0476 6.8581 11.0101C7.12065 10.9725 7.38734 11.0409 7.59952 11.2L10.8675 13.651L18.2135 5.49C17.1493 4.47411 15.8523 3.7346 14.436 3.33622C13.0197 2.93784 11.5274 2.89274 10.0896 3.20487C8.6519 3.517 7.31259 4.17684 6.18899 5.12661C5.06539 6.07639 4.19176 7.28713 3.64459 8.65284C3.09743 10.0185 2.89342 11.4976 3.05042 12.9604C3.20742 14.4233 3.72064 15.8253 4.54516 17.0438C5.36967 18.2623 6.48033 19.2601 7.77989 19.9498C9.07945 20.6395 10.5283 21.0001 11.9995 21Z" fill="#42BE65"/>
                            </svg>
                            : confirmIconSymbolValue === "Wrong mark" ?
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.2898 3.85996L1.81978 18C1.64514 18.3024 1.55274 18.6453 1.55177 18.9945C1.55079 19.3437 1.64127 19.6871 1.8142 19.9905C1.98714 20.2939 2.2365 20.5467 2.53748 20.7238C2.83847 20.9009 3.18058 20.9961 3.52978 21H20.4698C20.819 20.9961 21.1611 20.9009 21.4621 20.7238C21.7631 20.5467 22.0124 20.2939 22.1854 19.9905C22.3583 19.6871 22.4488 19.3437 22.4478 18.9945C22.4468 18.6453 22.3544 18.3024 22.1798 18L13.7098 3.85996C13.5315 3.56607 13.2805 3.32308 12.981 3.15444C12.6814 2.98581 12.3435 2.89722 11.9998 2.89722C11.656 2.89722 11.3181 2.98581 11.0186 3.15444C10.7191 3.32308 10.468 3.56607 10.2898 3.85996V3.85996Z" stroke="#DF0707" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M12 9V13" stroke="#DF0707" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M12 17H12.01" stroke="#DF0707" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            : 
                            <></>
                        }
                        
                    </div>
                    {confirmIconSymbolValue === "Wrong mark" ? <p className={errorStyles}>Паролі не співпадають</p> : <></>}
                    {/* <ErrorMessage name="confirmPassword" className={errorStyles} component="div" /> */}
                </label>
            </div>
            <button type="submit" className={submitButtonClassName}>
                Змінити пароль
            </button>
        </Form>
      )}
    </Formik>
  );
};