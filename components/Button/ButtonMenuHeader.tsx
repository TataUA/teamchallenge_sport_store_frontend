import React from "react";
import { cn } from "@/services/utils/cn";

interface ButtonMenuProps {
  title: string;
  onClick?: () => void;
  paddingLeftFirst?: string;
  backGr?: string;
  selected?: boolean;
  goodsGroups?: string;
  textCollor?: string;
  fontWeight?: string;
}

export const Button = (props: ButtonMenuProps) => {
  const buttonStyles = {
    menuButton:
      "relative w-full h-[48px] self-center  pr-3  text-[14px] text-title leading-6 bg-white tracking-custom_2 font-semibold font-pangram hover:text-title transition-all duration-300n",
  };

  let buttonsMenu = cn(
    buttonStyles.menuButton,
    `${props.paddingLeftFirst}`,
    `${props.backGr}`,
    `${props.goodsGroups}`,
    `${props.textCollor}`,
    `${props.fontWeight}`,
  );

  if (props.selected) {
    buttonsMenu = cn(
      buttonStyles.menuButton,
      "underline underline-offset-[10px] decoration-blue",
      `${props.paddingLeftFirst}`,
    );
  }

  return (
    <button type="button" onClick={props.onClick} className={buttonsMenu}>
      {props.title}
    </button>
  );
};
