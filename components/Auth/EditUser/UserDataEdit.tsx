"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { Formik, Form, FormikHelpers } from "formik";
import { AppDispatch } from "@/redux/store";
import { selectUserData } from "@/redux/auth/authSelector";
import { editUserThunk } from "@/redux/auth/authThunk";
import { InputLabelField } from "@/components/Auth/InputLabelField";
import { handleUserValidationErrors } from "@/helpers/handleUserValidationErrors";
import { Button } from "@/components/Button/Button";

export const schema = yup.object().shape({
  name: yup
    .string()
    .min(1)
    .matches(
      /^(?!.*[ыёъэЫЁЪЭ])[A-Za-zА-Яа-яЇїІіЄєҐґ']+$/,
      "Це поле може містити лише латинські та українські літери",
    )
    .required("Це поле обов'язкове"),
  surname: yup
    .string()
    .min(1)
    .matches(
      /^(?!.*[ыёъэЫЁЪЭ])[A-Za-zА-Яа-яЇїІіЄєҐґ']+$/,
      "Це поле може містити лише латинські та українські літери",
    )
    .required("Це поле обов'язкове"),
  patronymic: yup
    .string()
    .min(1)
    .matches(
      /^(?!.*[ыёъэЫЁЪЭ])[A-Za-zА-Яа-яЇїІіЄєҐґ']+$/,
      "Це поле може містити лише латинські та українські літери",
    )
    .required("Це поле обов'язкове"),
  phone: yup
    .string()
    .min(13, "Номер повинен містити 13 символів")
    .max(13, "Номер повинен містити 13 символів")
    .matches(
      /^\+380\d{9}$/,
      "Номер телефону повинен бути у форматі +380*********",
    )
    .required("Це поле обов'язкове"),
  email: yup
    .string()
    .email("Введіть дійсну електронну адресу")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Невірний формат адреси електронної пошти",
    )
    .required("Це поле обов'язкове"),
});

export interface UserDataEditFormValues {
  id: number | string;
  name: string;
  surname: string;
  patronymic: string;
  phone: string;
  email: string;
}

interface UserDataEditProps {
  setEditData: (edit: boolean) => void;
  setShowSuccessMessage: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserDataEdit = (props: UserDataEditProps) => {
  const user = useSelector(selectUserData);
  const dispatch: AppDispatch = useDispatch();

  const initialValues: UserDataEditFormValues = {
    id: user?.id || "",
    name: user?.name || "",
    surname: user?.surname || "",
    patronymic: user?.patronymic || "",
    phone: user?.phone || "",
    email: user?.email || "",
  };

  const handleSubmit = async (
    values: UserDataEditFormValues,
    { resetForm, setErrors }: FormikHelpers<UserDataEditFormValues>,
  ) => {
    try {
      const actionResult = await dispatch(editUserThunk(values));

      if (editUserThunk.fulfilled.match(actionResult)) {
        resetForm();
        props.setEditData(false);
        props.setShowSuccessMessage(true);
      } else if (editUserThunk.rejected.match(actionResult)) {
        handleUserValidationErrors(actionResult, setErrors);
      }
    } catch (error) {
      console.error("Edit user`s data failed in catch block:", error);
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

            <Button
              type="submit"
              subtype="primary"
              title="Зберегти"
              disabled={formik.isSubmitting}
              styles="mb-2"
            />
          </Form>
        )}
      </Formik>
    </>
  );
};
