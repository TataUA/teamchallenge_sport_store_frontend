"use client";

// utils
import { cn } from "@/services/utils/cn";

import getSuccessBlueIcon from "@/helpers/getSuccessBlueIconSVG";

interface IButtonProps {
  disabled?: boolean;
}

export const FormBannerButton = ({ disabled }: IButtonProps) => {
  const submitted = disabled;

  return (
    <>
      <button
        disabled={submitted}
        className={cn(
          "mt-[-6px] text-title min-w-[148px] py-3 px-5 bg-white md:bg-blue md:text-white rounded-xl tracking-wide font-semibold hover:opacity-70 disabled:hover:opacity-100 md:hover:opacity-100 md:hover:bg-active_blue xl:py-4 xl:tracking-wider ",
          "max-[767px]:px-6 max-[767px]:rounded-xl",
          "min-[2800px]:text-3xl min-[2800px]:min-w-[235px]",
          {
            "md:bg-white md:hover:bg-white md:border selection: md:border-blue":
              submitted,
          },
        )}
      >
        {submitted ? (
          <span className="[&>svg]:w-5 [&>svg]:h-5 [&>svg]:m-auto min-[2800px]:[&>svg]:w-8 min-[2800px]:[&>svg]:h-9">
            {getSuccessBlueIcon()}
          </span>
        ) : (
          "Підписатись"
        )}
      </button>
    </>
  );
};
