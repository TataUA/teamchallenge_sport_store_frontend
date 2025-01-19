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
    "min-h-14 py-3 cursor-default pointer-events-none flex justify-between items-center",
    `${user?.id ? "opacity-[100%]" : "opacity-[50%]"}`,
    "[&>svg]:stroke-primary text-primary hover:text-blue active:text-blue [&>svg]:hover:stroke-blue [&>svg]:active:stroke-blue",
    {
      " pointer-events-auto cursor-pointer": user?.id,
    },
  );

  return (
    <div className="flex flex-col">
      <Link
        className={classname}
        href="/auth/profile"
        onClick={() => onClose()}
      >
        <p className="font-button font-medium line-height-150 tracking-wide-04 flex">
          Мої данні
        </p>
      </Link>
      <Link className={classname} href="/orders" onClick={() => onClose()}>
        <p className="font-button font-medium  line-height-150 tracking-wide-04 flex">
          Мої замовлення
        </p>
      </Link>
      <div className="bg-[#CFCFCF] h-[1px] my-2" />
      <div
        className={classname}
        onClick={() => {
          onClose();
          handleLogout();
        }}
      >
        <p className="font-button font-medium line-height-150 tracking-wide-04 flex">
          Вихід
        </p>
      </div>
    </div>
  );
};
