import React from "react";
import { cn } from "@/services/utils/cn";

interface ButtonProps {
  type: "button" | "submit";
  subtype: "primary" | "secondary" | "tertiary";
  title: string;
  onClick: () => void;
  disabled?: boolean;
  styles?: string;
}

export const Button = (props: ButtonProps) => {
  const buttonStyles = {
    primary: "bg-blue text-white hover:bg-active_blue",
    secondary:
      "border border-blue bg-white text-blue hover:bg-active_lightblue",
    tertiary:
      "border border-border_button bg-white text-common hover:border-border hover:bg-border_button",
  };

  return (
    <button
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
      className={cn(
        "w-full h-12 self-center px-6 rounded-xl text-base font-semibold font-pangram transition-all",
        buttonStyles[props.subtype],
        `${props.styles}`,
      )}
    >
      {props.title}
    </button>
  );
};