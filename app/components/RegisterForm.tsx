"use client";

import React, { useState } from "react";
//import { useDispatch } from "react-redux";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
//import { registerUserThunk } from "redux/auth/authThunk";

export const schema = yup.object().shape({
  name: yup
    .string()
    .min(1, "Це поле не може бути порожнім")
    .matches(/^[A-Za-zА-Яа-яЁёЇїІіЄєҐґ']+$/, "Це поле може містити лише літери")
    .required("Це поле обов'язкове"),
  surname: yup
    .string()
    .min(1, "Це поле не може бути порожнім")
    .matches(/^[A-Za-zА-Яа-яЁёЇїІіЄєҐґ']+$/, "Це поле може містити лише літери")
    .required("Це поле обов'язкове"),
  patronymic: yup
    .string()
    .min(1, "Це поле не може бути порожнім")
    .matches(/^[A-Za-zА-Яа-яЁёЇїІіЄєҐґ']+$/, "Це поле може містити лише літери")
    .required("Це поле обов'язкове"),
  phone: yup
    .string()
    .min(12, "Номер телефону повинен містити не менше 12 символів")
    .matches(
      /^\+380\d{9}$/,
      "Номер телефону повинен бути у форматі +380*********"
    )
    .required("Це поле обов'язкове"),
  email: yup
    .string()
    .email("Введіть дійсну електронну адресу")
    .required("Це поле обов'язкове"),
  password: yup
    .string()
    .min(6, "Пароль повинен містити не менше 6 символів")
    .matches(
      /^[A-Za-z0-9!@#$%^&*]+$/,
      "Пароль може містити лише літери, цифри та символи"
    )
    .required("Це поле обов'язкове"),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Паролі повинні співпадати")
    .required("Це поле обов'язкове"),
});

interface FormValues {
  name: string;
  surname: string;
  patronymic: string;
  phone: string;
  email: string;
  password: string;
  repeatPassword: string;
}

const initialValues: FormValues = {
  name: "",
  surname: "",
  patronymic: "",
  phone: "",
  email: "",
  password: "",
  repeatPassword: "",
};

export const RegisterForm = () => {
  const [phone, setPhone] = useState("");
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  //const dispatch = useDispatch();

  const handleSubmit = (
    values: FormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    //dispatch(registerUserThunk({ name, email, password }));

    //DELETE
    console.log(values);
    resetForm();
    setPhone("");
  };

  return (
    <Formik
      initialValues={{ ...initialValues, phone }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form autoComplete="on">
          <label htmlFor="name" className="block mb-4">
            Ім&apos;я
            <Field
              id="name"
              type="text"
              name="name"
              className="block border-b-2"
            />
            <ErrorMessage name="name" component="div" />
          </label>

          <label htmlFor="surname" className="block mb-4">
            Прізвище
            <Field
              id="surname"
              type="text"
              name="surname"
              className="block border-b-2"
            />
            <ErrorMessage name="surname" component="div" />
          </label>

          <label htmlFor="patronymic" className="block mb-4">
            По-батькові
            <Field
              id="patronymic"
              type="text"
              name="patronymic"
              className="block border-b-2"
            />
            <ErrorMessage name="patronymic" component="div" />
          </label>

          <label htmlFor="phone" className="block mb-4">
            Номер телефону
            <Field
              id="phone"
              type="text"
              name="phone"
              className="block border-b-2"
              value={isPhoneFocused || phone.length > 4 ? phone : ""}
              onFocus={() => {
                setIsPhoneFocused(true);
                if (!phone.startsWith("+380")) {
                  const newPhone = "+380" + phone.slice(4);
                  setPhone(newPhone);
                  formik.setFieldValue("phone", newPhone);
                }
              }}
              onBlur={() => {
                if (phone === "+380") {
                  setPhone("");
                }
                setIsPhoneFocused(false);
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const inputValue = e.target.value;
                if (inputValue.startsWith("+380") || inputValue === "") {
                  setPhone(inputValue);
                  formik.setFieldValue("phone", inputValue);
                }
              }}
            />
            <ErrorMessage name="phone" component="div" />
          </label>
          <label htmlFor="email" className="block mb-4">
            Електронна пошта
            <Field
              id="email"
              type="email"
              name="email"
              className="block border-b-2"
            />
            <ErrorMessage name="email" component="div" />
          </label>
          <label htmlFor="password" className="block mb-4">
            Пароль
            <Field
              autoComplete="off"
              id="password"
              type="password"
              name="password"
              className="block border-b-2"
            />
            <ErrorMessage name="password" component="div" />
          </label>
          <label htmlFor="repeatPassword" className="block mb-4">
            Повторити пароль
            <Field
              autoComplete="off"
              id="repeatPassword"
              type="password"
              name="repeatPassword"
              className="block border-b-2"
            />
            <ErrorMessage name="repeatPassword" component="div" />
          </label>
          <button type="submit" className="h-12 border-2">
            Зареєструватись
          </button>
        </Form>
      )}
    </Formik>
  );
};
