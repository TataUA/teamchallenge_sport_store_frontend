"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { Formik, Form, FormikHelpers } from "formik";
import { AppDispatch } from "@/redux/store";
import { selectUserData } from "@/redux/auth/authSelector";
import { editUserThunk } from "@/redux/auth/authThunk";
import { InputLabelField } from "./InputLabelField";
import { SuccessRegisterModal } from "./SuccessRegisterModal";

export const schema = yup.object().shape({
  name: yup
    .string()
    .min(1)
    .matches(
      /^(?!.*[ыёъэЫЁЪЭ])[A-Za-zА-Яа-яЇїІіЄєҐґ']+$/,
      "Це поле може містити лише латинські та українські літери"
    )
    .required("Це поле обов'язкове"),
  surname: yup
    .string()
    .min(1)
    .matches(
      /^(?!.*[ыёъэЫЁЪЭ])[A-Za-zА-Яа-яЇїІіЄєҐґ']+$/,
      "Це поле може містити лише латинські та українські літери"
    )
    .required("Це поле обов'язкове"),
  patronymic: yup
    .string()
    .min(1)
    .matches(
      /^(?!.*[ыёъэЫЁЪЭ])[A-Za-zА-Яа-яЇїІіЄєҐґ']+$/,
      "Це поле може містити лише латинські та українські літери"
    )
    .required("Це поле обов'язкове"),
  phone: yup
    .string()
    .min(13, "Номер повинен містити 13 символів")
    .max(13, "Номер повинен містити 13 символів")
    .matches(
      /^\+380\d{9}$/,
      "Номер телефону повинен бути у форматі +380*********"
    )
    .required("Це поле обов'язкове"),
  email: yup
    .string()
    .email("Введіть дійсну електронну адресу")
    .required("Це поле обов'язкове"),
});

export interface UserDataEditFormValues {
  name: string;
  surname: string;
  patronymic: string;
  phone: string;
  email: string;
}

let initialValues: UserDataEditFormValues = {
  name: "",
  surname: "",
  patronymic: "",
  phone: "",
  email: "",
};

interface UserDataEditProps {
  setEditData: (edit: boolean) => void;
}

export const UserDataEdit = (props: UserDataEditProps) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const user = useSelector(selectUserData);

  const dispatch: AppDispatch = useDispatch();

  if (user) {
    initialValues = {
      name: user.name,
      surname: user.surname,
      patronymic: user.patronymic,
      phone: user.phone,
      email: user.email,
    };
  }

  const handleSubmit = async (
    values: UserDataEditFormValues,
    { resetForm, setErrors }: FormikHelpers<UserDataEditFormValues>
  ) => {
    try {
      const actionResult = await dispatch(editUserThunk(values));
      if (editUserThunk.fulfilled.match(actionResult)) {
        resetForm();
        setShowSuccessModal(true);
      } else if (editUserThunk.rejected.match(actionResult)) {
        let errorData: any = actionResult.payload;
        if (
          errorData &&
          errorData.message &&
          Array.isArray(errorData.message)
        ) {
          if (
            errorData.message.includes("user with this email already exists.")
          ) {
            setErrors({ email: "Така пошта вже зареєстрована" });
          } else if (
            errorData.message.includes("The phone number entered is not valid.")
          ) {
            setErrors({ phone: "Введений номер не вірний" });
          } else if (
            errorData.message.includes(
              "user with this phone number already exists."
            )
          ) {
            setErrors({ phone: "Такий номер вже зареєстрований" });
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
        initialValues={{ ...initialValues }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form autoComplete="off" className="flex flex-col">
            <div className="flex flex-col gap-4 mb-8">
              <InputLabelField
                label="Прізвище"
                name="surname"
                type="text"
                inputMode="text"
                placeholder=""
                formik={formik}
              />

              <InputLabelField
                label="Ім'я"
                name="name"
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
            </div>

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="h-12 mb-2 px-6  rounded-xl bg-blue text-base font-semibold  text-white hover:bg-active_blue transition-all"
            >
              Зберегти
            </button>
          </Form>
        )}
      </Formik>

      <SuccessRegisterModal
        showSuccessModal={showSuccessModal}
        setShowSuccessModal={setShowSuccessModal}
      />
    </>
  );
};
