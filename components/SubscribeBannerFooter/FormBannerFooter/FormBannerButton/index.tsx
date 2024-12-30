"use client";

import { cn } from "@/services/utils/cn";
import getSuccessBlueIcon from "@/helpers/getSuccessBlueIconSVG";

export const FormBannerButton = ({ disabled }: { disabled?: boolean }) => {
  const submitted = disabled;

  return (
    <button
      disabled={submitted}
      className={cn(
        "w-[149px] h-12 xl:h-14 rounded-xl bg-white xl:bg-blue text-center font-semibold text-base text-title xl:text-white tracking-custom_2 hover:opacity-70 disabled:hover:opacity-100 xl:hover:opacity-100 xl:hover:bg-active_blue",
        {
          "xl:bg-white xl:hover:bg-white xl:border xl:border-blue": submitted,
        },
      )}
    >
      {submitted ? (
        <span className="[&>svg]:w-5 [&>svg]:h-5 [&>svg]:m-auto">
          {getSuccessBlueIcon()}
        </span>
      ) : (
        "Підписатись"
      )}
    </button>
  );
};
