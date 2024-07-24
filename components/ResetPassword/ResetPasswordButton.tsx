"use client";

import React from "react";
import { Dispatch, SetStateAction } from "react";

export interface Props {
  showPasswordResetBlock: boolean;
  setShowPasswordResetBlock: Dispatch<SetStateAction<boolean>>;
}

export const ResetPasswordButton = (props: Props) => {
  return (
    <button
      type="button"
      className="block mt-2 mb-5 text-sm font-medium text-title border-b border-border"
      onClick={() => {
        props.setShowPasswordResetBlock(true);
      }}
    >
      Забули пароль?
    </button>
  );
};
