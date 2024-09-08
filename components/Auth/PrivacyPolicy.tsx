import React from "react";
import Link from "next/link";

export const PrivacyPolicy = () => {
  return (
    <div className="flex items-center justify-center h-[44px]">
      <p className="text-xs leading-150 font-inter font-normal text-label text-justify">
        Натискаючи на кнопку я погоджуюсь з{" "}
        <Link href="" className="border-b border-border">
          умовами політики конфіденційності
        </Link>{" "}
        та
        <Link href="" className="border-b border-border">
          {" "}
          договором користувача
        </Link>
      </p>
    </div>
  );
};
