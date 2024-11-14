import React from "react";
import { cn } from "@/services/utils/cn";

interface ButtonMenuProps {
  title: string;
  onClick?: () => void;
  paddingLeftFirst?: string;
  backGr?: string;
  selected?: boolean;
  goodsGroups?: string;
}

export const Button = (props: ButtonMenuProps) => {
  const buttonStyles = {
    menuButton:
      "relative w-full h-[48px] self-center  pr-5  text-[14px] text-secondary leading-6 bg-white tracking-custom_2 font-semibold font-pangram hover:text-title transition-all duration-300n",
  };

  let buttonsMenu = cn(
    buttonStyles.menuButton,
    `${props.paddingLeftFirst}`,
    `${props.backGr}`,
    `${props.goodsGroups}`,
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
