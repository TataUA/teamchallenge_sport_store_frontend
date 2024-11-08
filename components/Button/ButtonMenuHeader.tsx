import React from "react";
import { cn } from "@/services/utils/cn";

interface ButtonMenuProps {
  subtype: "primary" | "secondary";
  title: string;
  onClick?: () => void;
  styles?: string;
}

export const Button = (props: ButtonMenuProps) => {
  const buttonStyles = {
    primary: "bg-blue text-white hover:bg-active_blue",
    secondary:
      "border border-blue bg-white text-blue hover:bg-active_lightblue",
  };

  return (
    <button
      type="button"
      onClick={props.onClick}
      className={cn(
        "w-full h-[48px] self-center px-6 rounded-xl text-base tracking-custom_2 font-semibold font-pangram transition-all",
        buttonStyles[props.subtype],
        `${props.styles}`,
      )}
    >
      {props.title}
    </button>
  );
};
