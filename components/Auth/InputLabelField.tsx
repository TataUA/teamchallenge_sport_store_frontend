"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Field, ErrorMessage, FormikProps } from "formik";
import { cn } from "@/services/utils/cn";
import wrong from "@/public/icons/wrong.svg";
import eye_open from "@/public/icons/eye_open.svg";
import eye_close from "@/public/icons/eye_close.svg";

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
  const [hasBlurred, setHasBlurred] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isTouched = formik.touched[name];
  const isError = Boolean(formik.errors[name]);

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
    formik.setFieldValue(String(name), e.target.value, true);
    formik.handleBlur(e);
    setIsFieldFocused(false);
    setHasBlurred(true);
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
        id={name}
        type={type === "password" && showPassword ? "text" : type}
        name={name}
        inputMode={inputMode}
        value={formik.values[name]}
        placeholder={formik.touched[name] ? placeholder : undefined}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={cn("input peer", {
          "border-blue":
            (!formik.errors[name] && formik.touched[name]) ||
            formik.values[name],
          "border-red": formik.errors[name] && formik.touched[name],
        })}
      />

      {(name === "password" || name === "repeatPassword") && isTouched && (
        <button
          type="button"
          className="absolute right-2 top-5 "
          onClick={togglePasswordVisibility}
        >
          <Image
            src={showPassword ? eye_open : eye_close}
            width={24}
            height={24}
            alt={showPassword ? "hide password" : "show password"}
          />
        </button>
      )}

      <label
        htmlFor={name as string}
        className={cn(
          "label absolute left-0 top-5 transform transition-all duration-300",
          {
            "text-blue":
              formik.touched[name] ||
              (isFieldFocused && hasBlurred) ||
              formik.values[name],
            "text-red":
              formik.errors[name] && formik.touched[name] && hasBlurred,
          },
          {
            "top-0 text-sm": formik.touched[name] || formik.values[name],
            "peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue":
              !formik.touched[name] && !formik.values[name],
          }
        )}
      >
        {label}
      </label>

      {isError && isTouched && hasBlurred && (
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
