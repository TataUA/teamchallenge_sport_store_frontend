"use client";

import React, { Dispatch, SetStateAction } from "react";

interface Props {
  setShowPasswordResetBlock: Dispatch<SetStateAction<boolean>>;
}

export const ResetPasswordButton = (props: Props) => {
  return (
    <button
      type="button"
      className="block h-8 mt-2 mb-5 text-sm tracking-[0.32px] font-medium text-title underline"
      onClick={() => {
        props.setShowPasswordResetBlock(true);
      }}
    >
      Забули пароль?
    </button>
  );
};
