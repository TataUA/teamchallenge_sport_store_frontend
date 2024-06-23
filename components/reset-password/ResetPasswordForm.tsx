"use client";

import React from "react";
import { redirect } from 'next/navigation'
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

import { submitButtonClassName } from "./ResetPasswordRequestForm";
import { animateInputField } from "./ResetPasswordRequestForm";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { validateTokenThunk, resetPasswordThunk } from "@/redux/auth/authThunk";


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
  // tokenValue: string
}

const initialValues: PasswordConfirmationValues = {
  password: "",
  confirmPassword: "",
  // tokenValue: ""
};

interface Props {
    tokenValue: string
  }

export interface ResetPasswordValuesInterface {
  password: string;
  confirmPassword: string;
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

  const [animateField, setAnimateField] = useState<boolean>(false);

  const [animateConfirmField, setAnimateConfirmField] = useState<boolean>(false);

  const dispatch: AppDispatch = useDispatch();

  gsap.registerPlugin();

  const formRef: any = useRef();

  useLayoutEffect(() => {
    animateInputField(animateField, formRef, ".Password-Input-Label");
  }, [animateField]);

  useLayoutEffect(() => {
    animateInputField(animateConfirmField, formRef, ".Confirm-Password-Input-Label");
  }, [animateConfirmField]);


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
    resetForm();
    setConfirmIconSymbolValue("");
    setIconSymbolValue("");
    const resetPasswordData = {
      password: values.password,
      confirmPassword: values.confirmPassword,
      tokenValue: props.tokenValue
    }
    dispatch(validateTokenThunk(props.tokenValue)).then((error) => {
      if(error) {
        dispatch(resetPasswordThunk(resetPasswordData)).then((error) => {
          if(error) {
            // redirect('/success-page')
          }
        })
        
      }
    });
    // validateToken(props.tokenValue, values.password)

  };

  return (
    <div ref={formRef}>
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
                        <p className={`text-basic ${passwordLabelClassname} Password-Input-Label`}>Пароль</p>
                        <div className={`flex flex-row justify-between items-top border-b-2 ${iconSymbolValue !== "Correct mark" ? iconSymbolValue === "Wrong mark" ? "border-red" : "" : "border-green"}`}>
                            <Field
                            className="h-13 w-full placeholder:text-button focus:outline-none pb-2 text-label text-basic"
                            id="password"
                            type="password"
                            name="password"
                            placeholder={passwordPlaceholderValue}
                            value={formik.values.password}
                            onFocus={() => {setPasswordLabelClassname(""); setPasswordPlaceholderValue("Має містити мінімум 6 знаків"); setAnimateField(true)}}
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
                                <Image className="ml-2 mb-2" src={require("../../public/icons/reset-password/correct_mark.svg")} alt='close' width={24} height={24} />
                                : iconSymbolValue === "Wrong mark" ?
                                <Image className="ml-2 mb-2" src={require("../../public/icons/reset-password/wrong_mark.svg")} alt='close' width={24} height={24} />
                                : 
                                <></>
                            }
                        </div>
                        <ErrorMessage className={errorStyles} name="password" component="div" />
                    </label>

                    <label htmlFor="confirmPassword"
                    className={`${confirmIconSymbolValue !== "Correct mark" ? confirmIconSymbolValue === "Wrong mark" ? "text-red" : "" : "text-green"}`}
                    >
                        <p className={`text-basic ${confirmPasswordLabelClassname} Confirm-Password-Input-Label`}>Підтвердити пароль</p>
                        <div className={`flex flex-row justify-between items-top border-b-2 ${confirmIconSymbolValue !== "Correct mark" ? confirmIconSymbolValue === "Wrong mark" ? "border-red" : "" : "border-green"}`}>
                            <Field
                            className="h-13 w-full placeholder:text-button focus:outline-none pb-2 text-label text-basic"
                            autoComplete="off"
                            id="confirmPassword"
                            type="password"
                            name="confirmPassword"
                            placeholder={confirmPasswordPlaceholderValue}
                            value={formik.values.confirmPassword}
                            onFocus={() => {setConfirmPasswordLabelClassname(""); setConfirmPasswordPlaceholderValue("Має містити мінімум 6 знаків"); setAnimateConfirmField(true)}}
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
                                <Image className="ml-2 mb-2" src={require("../../public/icons/reset-password/correct_mark.svg")} alt='close' width={24} height={24} />
                                : confirmIconSymbolValue === "Wrong mark" ?
                                <Image className="ml-2 mb-2" src={require("../../public/icons/reset-password/wrong_mark.svg")} alt='close' width={24} height={24} />
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
    </div>
  );
};