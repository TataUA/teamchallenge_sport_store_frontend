import React from "react";
import Link from "next/link";

export const PrivacyPolicy = () => {
  return (
    <>
      <p className="text-xs leading-150 font-inter font-normal text-label">
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
    </>
  );
};
