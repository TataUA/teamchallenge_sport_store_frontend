"use client";

import Link from "next/link";

// components
import getArrowRightIconSVG from "@/helpers/getArrowRightIconSVG";
import { cn } from "@/services/utils/cn";
import { useSelector } from "react-redux";
import { selectUserData } from "@/redux/auth/authSelector";
import useLogout from "@/hooks/useLogout";

export const UsernavMobile = ({ onClose }: { onClose: () => void }) => {
  const user = useSelector(selectUserData);
  const handleLogout = useLogout();

  const classname = cn(
    " cursor-default pointer-events-none flex justify-between items-center",
    `${user?.id ? "opacity-[100%]" : "opacity-[50%]"}`,
    "[&>svg]:stroke-primary text-primary hover:text-blue active:text-blue [&>svg]:hover:stroke-blue [&>svg]:active:stroke-blue",
    {
      " pointer-events-auto cursor-pointer": user?.id,
    },
  );

  return (
    <div className="min-h-14 py-3 flex gap-5 flex-col">
      <Link
        className={classname}
        href="/auth/profile"
        onClick={() => onClose()}
      >
        <p className="font-button py-3 font-medium line-height-150 tracking-wide-04 flex">
          Мої данні
        </p>
        {getArrowRightIconSVG()}
      </Link>
      <Link className={classname} href="/orders" onClick={() => onClose()}>
        <p className="font-button py-3 font-medium  line-height-150 tracking-wide-04 flex">
          Мої замовлення
        </p>
        {getArrowRightIconSVG()}
      </Link>
      <div className="bg-[#CFCFCF] h-[1px]" />
      <div
        className={classname}
        onClick={() => {
          onClose();
          handleLogout();
        }}
      >
        <p className="font-button py-3 font-medium line-height-150 tracking-wide-04 flex">
          Вихід
        </p>
        {getArrowRightIconSVG()}
      </div>
    </div>
  );
};
