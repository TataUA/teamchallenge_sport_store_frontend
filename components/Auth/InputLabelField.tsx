"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Field, ErrorMessage, FormikProps } from "formik";
import { v4 as uuidv4 } from "uuid";
import { cn } from "@/services/utils/cn";
import wrong from "@/public/icons/auth/wrong.svg";
import eye_open from "@/public/icons/auth/eye_open.svg";
import eye_close from "@/public/icons/auth/eye_close.svg";
import { RegisterFormErrors } from "@/services/types/auth-errors-types";

interface InputLabelFieldProps<T> {
  label: string;
  name: keyof T;
  type: "text" | "email" | "password";
  inputMode: "text" | "tel" | "email";
  placeholder: string;
  formik: FormikProps<T>;
}

export const InputLabelField = <T,>({
  label,
  name,
  type,
  inputMode,
  placeholder,
  formik,
}: InputLabelFieldProps<T>) => {
  const [isFieldFocused, setIsFieldFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const uniqueId = uuidv4();

  const isTouched = formik.touched[name];
  const isFieldError = Boolean(formik.errors[name]);
  const errorMessage =
    typeof formik.errors[name] === "string" ? formik.errors[name] : "";

  const isPasswordError =
    type === "password" &&
    ((formik.errors as RegisterFormErrors).password ||
      (formik.errors as RegisterFormErrors).repeatPassword) &&
    formik.submitCount > 0;

  const isError =
    ((isFieldError && name !== "repeatPassword") || isPasswordError) &&
    formik.submitCount > 0;

  const handleFocus = () => {
    setIsFieldFocused(true);

    if (!isTouched) {
      formik.setFieldTouched(String(name), true, false);
    }

    if (
      name === "phone" &&
      !formik.values[name]?.toString().startsWith("+380")
    ) {
      const newPhone = "+380" + formik.values[name]?.toString().slice(4);
      formik.setFieldValue(name, newPhone, false);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFieldFocused(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const trimmedValue = e.target.value.trim();
    if (name === "phone") {
      const cleanedValue = trimmedValue.replace(/[^\d+]/g, "");
      if (cleanedValue.startsWith("+380") || cleanedValue === "") {
        formik.setFieldValue(name, cleanedValue, false);
      }
    } else {
      formik.setFieldValue(String(name), trimmedValue, false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <Field
        id={uniqueId}
        type={type === "password" && showPassword ? "text" : type}
        name={name}
        inputMode={inputMode}
        value={formik.values[name]}
        placeholder={formik.touched[name] ? placeholder : undefined}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={cn("input peer", {
          "border-blue": !formik.errors[name] && isFieldFocused,
          "border-red": isError,
        })}
      />

      {(name === "password" || name === "repeatPassword") && isTouched && (
        <button
          type="button"
          className="absolute right-2 top-5 "
          onClick={togglePasswordVisibility}
        >
          <Image
            src={showPassword ? eye_close : eye_open}
            width={24}
            height={24}
            alt={showPassword ? "hide password" : "show password"}
          />
        </button>
      )}

      <label
        htmlFor={uniqueId}
        className={cn(
          "label absolute left-0 top-5 transform transition-all duration-300",
          {
            "text-blue": !formik.errors[name] && isFieldFocused,
            "text-red": isError,
          },
          {
            "top-0 text-sm": formik.touched[name] || formik.values[name],
            "peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue":
              !formik.touched[name] && !formik.values[name],
          },
        )}
      >
        {label}
      </label>

      {isError &&
        typeof errorMessage === "string" &&
        errorMessage.trim() !== "" && (
          <div className="flex items-center mt-4">
            <Image src={wrong} width={18} height={18} alt="Іконка помилки" />
            <ErrorMessage
              name={String(name)}
              component="div"
              className="ml-1.5 text-sm font-medium font-pangram text-red"
            />
          </div>
        )}
    </div>
  );
};
