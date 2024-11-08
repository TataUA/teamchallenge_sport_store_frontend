import React from "react";
import { cn } from "@/services/utils/cn";

interface ButtonMenuProps {
  title: string;
  onClick?: () => void;
  paddingLeftFirst?: string;
  backGr?: string;
}

export const Button = (props: ButtonMenuProps) => {
  const buttonStyles = {
    primary: "h-8 bg-white text-common  hover:bg-border_button",
  };

  return (
    <button
      type="button"
      onClick={props.onClick}
      className={cn(
        "w-full h-[48px] self-center  pr-5  text-[14px] text-secondary leading-6 bg-white tracking-custom_2 font-semibold font-pangram hover:text-title  visited:text-title transition-all",
        `${props.paddingLeftFirst}`,
        `${props.backGr}`,
      )}
    >
      {props.title}
    </button>
  );
};
