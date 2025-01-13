"use client";

import useLogout from "@/hooks/useLogout";
import { cn } from "@/services/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ProfileMenu = () => {
  const handleLogout = useLogout();

  const pathname = usePathname();

  return (
    <div className="hidden md:block w-full md:w-[212px] pt-[30px]">
      <ul className="flex md:flex-col gap-5">
        <Link
          href="/auth/profile"
          className={cn("cursor-pointer hover:text-blue", {
            "text-blue disabled cursor-default": pathname === "/auth/profile",
          })}
        >
          Мої данні
        </Link>
        <Link
          href="/orders"
          className={cn("cursor-pointer hover:text-blue", {
            "text-blue disabled cursor-default": pathname === "/orders",
          })}
        >
          Мої замовлення
        </Link>
        <div className="bg-[#CFCFCF] h-[1px]" />
        <li
          className={cn("cursor-pointer hover:text-blue")}
          onClick={() => handleLogout()}
        >
          Вийти
        </li>
      </ul>
    </div>
  );
};

export default ProfileMenu;
