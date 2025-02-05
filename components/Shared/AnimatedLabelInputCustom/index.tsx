import { cn } from "@/services/utils/cn";
import { useState } from "react";

interface IProps {
  label: string;
  placeholder: string;
  value: string | number;
  classname?: string;
  classnameInput?: string;
  classnameLabel?: string;
  id?: string;
  name?: string;
  maxLength?: number;
  required?: boolean;
  type?: "text" | "number";
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AnimatedLabelInputCustom = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  classname,
  id,
  name,
  classnameInput,
  classnameLabel,
  ...other
}: IProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className={`relative mb-4 ${classname ? `${classname}` : ""}`}>
      <input
        id={id || label}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={cn(
          "w-full py-2 pt-[1.25rem] text-base border-b border-[#CFCFCF] leading-[165%]",
          "transition-colors duration-300 focus:outline-none",
          {
            "border-blue": isFocused || value,
          },
          `${classnameInput}`,
        )}
        placeholder={isFocused ? placeholder : ""}
        {...other}
      />
      <label
        className={cn(
          "absolute left-0 text-base text-[#868687] top-6 transition-all duration-300",
          "transition-colors duration-300 focus:outline-none",
          {
            "text-xs text-blue top-0": isFocused || value,
          },
          `${classnameLabel}`,
        )}
        htmlFor={id || label}
      >
        {label}
      </label>
    </div>
  );
};

export default AnimatedLabelInputCustom;
