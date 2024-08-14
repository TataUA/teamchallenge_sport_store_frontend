"use client";

import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import * as yup from "yup";
import { Formik, Form, FormikHelpers } from "formik";
import { AppDispatch } from "@/redux/store";
import { resetPasswordRequestThunk } from "@/redux/auth/authThunk";
import { InputLabelField } from "@/components/Auth/InputLabelField";
import { ExtendedFormikErrors } from "@/components/Auth/LoginForm";
import { Button } from "@/components/Button/Button";
import close from "@/public/icons/close_icon.svg";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Введіть дійсну електронну адресу")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Невірний формат адреси електронної пошти",
    )
    .required("Це поле обов'язкове"),
});

interface ResetPasswordRequestProps {
  showPasswordResetBlock: boolean;
  setShowPasswordResetBlock: Dispatch<SetStateAction<boolean>>;
}

export interface ResetPasswordRequestValues {
  email: string;
}

const initialValues: ResetPasswordRequestValues = {
  email: "",
};

export const ResetPasswordRequestForm = (props: ResetPasswordRequestProps) => {
  const [sentForm, setSentForm] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (props.showPasswordResetBlock) {
      setSentForm(false);
    }
  }, [props.showPasswordResetBlock]);

  useEffect(() => {
    const handleKeyboardCloseForm = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        props.setShowPasswordResetBlock(false);
      }
    };

    document.addEventListener("keydown", handleKeyboardCloseForm);

    return () => {
      document.removeEventListener("keydown", handleKeyboardCloseForm);
    };
  }, [props]);

  const fetchResetPasswordRequest = async (
    values: ResetPasswordRequestValues,
  ) => {
    return await dispatch(resetPasswordRequestThunk(values));
  };

  const resendResetPasswordRequest = async () => {
    const requestData: ResetPasswordRequestValues = {
      email: userEmail,
    };
    await fetchResetPasswordRequest(requestData);
  };

  const handleSubmit = async (
    values: ResetPasswordRequestValues,
    { resetForm, setErrors }: FormikHelpers<ResetPasswordRequestValues>,
  ) => {
    try {
      setUserEmail(values.email);

      const actionResult = await fetchResetPasswordRequest(values);

      if (resetPasswordRequestThunk.fulfilled.match(actionResult)) {
        resetForm();
        setSentForm(true);
      } else if (resetPasswordRequestThunk.rejected.match(actionResult)) {
        //handleErrors(actionResult, setErrors);

        let errorData: any = actionResult.payload;
        const errorMessages: ExtendedFormikErrors = {};

        if (errorData && errorData.message) {
          if (
            errorData.message ===
            "No active account found with the given credentials"
          ) {
            errorMessages._error =
              "Неправильна адреса електронної пошти або пароль";
          } else {
            errorMessages._error = "Невідома помилка, спробуйте ще раз";
          }
        } else {
          errorMessages._error = errorData.message;
        }

        setErrors(errorMessages);
      }
    } catch (error) {
      console.error("Reset password failed in catch block:", error);
    }
  };

  return (
    <div>
      {props.showPasswordResetBlock ? (
        <div
          className="fixed w-full h-screen top-0 left-0 flex justify-center content-center bg-blured"
          onClick={() => {
            props.setShowPasswordResetBlock(false);
          }}
        >
          <div
            className="self-center p-6 bg-white rounded-3xl max-w-[88vw] max-h-[88vw] text-common text-sm leading-129 font-pangram font-medium"
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
              e.stopPropagation()
            }
          >
            <div className="flex flex-row justify-between items-center mb-4">
              <p className="text-xl text-title font-bold">Відновлення паролю</p>
              <button
                type="button"
                onClick={() => {
                  props.setShowPasswordResetBlock(false);
                }}
              >
                <Image
                  src={close}
                  alt="Хрестик закриття форми"
                  width={26}
                  height={26}
                />
              </button>
            </div>

            {sentForm === false ? (
              <>
                <p className="mb-6">
                  Вкажіть свою електронну адресу, і ми відправимо вам лист з
                  інструкцією
                </p>
                <Formik
                  initialValues={initialValues}
                  validationSchema={schema}
                  onSubmit={handleSubmit}
                >
                  {(formik) => (
                    <Form autoComplete="off">
                      <div className="mb-8">
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
                        title="Надіслати інструкцію"
                        onClick={formik.handleSubmit}
                        disabled={formik.isSubmitting}
                      />
                    </Form>
                  )}
                </Formik>
              </>
            ) : (
              <div>
                <p className="mb-8">
                  Ми надіслали посилання для відновлення на адресу
                  <span className="font-bold">{userEmail}</span>
                </p>

                <div className="flex flex-col gap-4">
                  <Button
                    type="button"
                    subtype="primary"
                    title="На сторінку входу"
                    onClick={() => props.setShowPasswordResetBlock(false)}
                  />
                  <Button
                    type="button"
                    subtype="tertiary"
                    title="Надіслати посилання ще раз"
                    onClick={resendResetPasswordRequest}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
