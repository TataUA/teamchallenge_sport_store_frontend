"use client";

import React from "react";
import { Dispatch, SetStateAction } from "react";

export interface Props {
  showPasswordResetBlock: boolean;
  setShowPasswordResetBlock: Dispatch<SetStateAction<boolean>>;
}


export const ResetPasswordButton = (props: Props) => {
    return(
        <button type="button" className="block mb-5" onClick={() => {props.setShowPasswordResetBlock(true)}}>Забули пароль?</button>
    )
}

