"use client";

import React, { Dispatch, SetStateAction } from "react";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { resetPasswordRequestThunk } from "@/redux/auth/authThunk";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

//import { Props } from "./ResetPasswordButton";
import Image from "next/image";

const schema = yup.object().shape({
  resetPasswordEmail: yup
    .string()
    .email("Введіть дійсну електронну адресу")
    .required("Це поле обов'язкове"),
});

interface Props {
  //emailValue: string;
  showPasswordResetBlock: boolean;
  setShowPasswordResetBlock: Dispatch<SetStateAction<boolean>>;
}

export interface ResetPasswordValues {
  resetPasswordEmail: string;
}

const initialValues: ResetPasswordValues = {
  resetPasswordEmail: "",
};

// setPopupContent("success message")

// const url = `http://34.66.71.139:8000/user/password_reset/`;

export const animateInputField = (
  animationTrigger: boolean,
  curentRef: any,
  element: string
) => {
  if (animationTrigger) {
    let ctxTo = gsap.context(() => {
      gsap.from(element, {
        duration: 0.5,
        y: 20,
      });
    }, curentRef);
    return () => ctxTo.revert();
  }
};

export const submitButtonClassName =
  "h-12 text-button bg-blue rounded-button text-white w-full font-semibold";
export const inputClassName =
  "block border-b-2 pb-2 w-full mb-8 text-label text-basic focus:outline-none";

export const ResetPasswordRequestForm = (props: Props) => {
  const [popupContent, setPopupContent] = useState<string>("form");

  const [labelClassname, setLabelClassname] =
    useState<string>("text-transparent");

  const [placeholderValue, setPlaceholderValue] =
    useState<string>("Електронна пошта");

  const [userEmail, setUserEmail] = useState<string>("");

  const [animateField, setAnimateField] = useState<boolean>(false);

  const dispatch: AppDispatch = useDispatch();

  gsap.registerPlugin();

  const formRef: any = useRef();

  useLayoutEffect(() => {
    animateInputField(animateField, formRef, ".Input-Label");
  }, [animateField]);

  const handleInputChange = (
    fieldName: string,
    fieldValue: string,
    setFieldValue: Function
  ) => {
    setFieldValue(fieldName, fieldValue.trim());
  };

  // async function postEmailValue(value: string) {
  //   try {
  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({"email": value}),
  //     });

  //     const result = await response.json();
  //     console.log("Success:", result);
  //     setUserEmail(value);
  //     setPopupContent("success message")
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // }

  const handleSubmit = (
    values: ResetPasswordValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    resetForm();
    dispatch(resetPasswordRequestThunk(values.resetPasswordEmail)).then(
      (error: any) => {
        if (!error) {
          setUserEmail(values.resetPasswordEmail);
          setPopupContent("success message");
        }
      }
    );
    // postEmailValue(values.resetPasswordEmail);
  };

  return (
    <div ref={formRef}>
      {props.showPasswordResetBlock ? (
        <div className="fixed w-full h-screen top-0 left-0 flex justify-center content-center bg-blured">
          <div className="self-center bg-white p-6 rounded-popup max-w-[88vw] max-h-[88vw] text-common text-basic font-medium">
            <div className="flex flex-row justify-between items-center mb-4">
              <p className="text-subheading text-title font-bold">
                Відновлення паролю
              </p>
              <p
                onClick={() => {
                  props.setShowPasswordResetBlock(false);
                }}
              >
                <Image
                  src={require("../../public/icons/reset-password/close_icon.svg")}
                  alt="close"
                  width={40}
                  height={40}
                />
              </p>
            </div>
            {popupContent === "form" ? (
              <>
                <p className="mb-4">
                  Вкажіть свою електронну адресу, і ми відправимо вам лист з
                  інструкцією
                </p>
                <Formik
                  initialValues={initialValues}
                  validationSchema={schema}
                  onSubmit={handleSubmit}
                >
                  {(formik) => (
                    <Form autoComplete="on">
                      <label
                        htmlFor="resetPasswordEmail"
                        className="block mb-4"
                      >
                        <p className={`${labelClassname} Input-Label`}>
                          Електронна пошта
                        </p>
                        <Field
                          id="resetPasswordEmail"
                          type="email"
                          name="resetPasswordEmail"
                          placeholder={placeholderValue}
                          value={formik.values.resetPasswordEmail}
                          onFocus={() => {
                            setLabelClassname("");
                            setPlaceholderValue("");
                            setAnimateField(true);
                          }}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            handleInputChange(
                              "resetPasswordEmail",
                              e.target.value,
                              formik.setFieldValue
                            );
                          }}
                          className={`placeholder:text-button ${inputClassName} mb-0`}
                        />
                        <ErrorMessage
                          name="resetPasswordEmail"
                          component="div"
                          className="text-red text-error font-medium"
                        />
                      </label>

                      <button type="submit" className={submitButtonClassName}>
                        Надіслати інструкцію
                      </button>
                    </Form>
                  )}
                </Formik>
              </>
            ) : (
              <div>
                <p className="mb-4">
                  Ми надіслали посилання для відновлення на адресу {userEmail}
                </p>
                <button
                  className={submitButtonClassName}
                  onClick={() => {
                    props.setShowPasswordResetBlock(false);
                  }}
                >
                  На сторінку входу
                </button>
                <button
                  className="h-12 text-button bg-white rounded-button w-full font-semibold border-2 mt-4"
                  // onClick={() => {postEmailValue(userEmail)}}
                  onClick={() => {
                    dispatch(resetPasswordRequestThunk(userEmail));
                  }}
                >
                  Надіслати посилання ще раз
                </button>
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
