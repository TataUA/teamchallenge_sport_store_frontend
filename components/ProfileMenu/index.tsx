'use client'

import { logoutUserThunk } from "@/redux/auth/authThunk";
import { AppDispatch } from "@/redux/store";
import { cn } from "@/services/utils/cn";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const ProfileMenu = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    dispatch(logoutUserThunk());
    router.push("/");
  };

  return (
    <div className="hidden md:block w-full md:w-[212px]">
      <ul className="flex md:flex-col gap-5">
        <Link
          href="/auth/profile"
          className={cn("cursor-pointer hover:text-blue", {
            "text-blue disabled cursor-default": pathname === "/auth/profile",
          })}
        >
          Особистий кабінет
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
          onClick={handleLogout}
        >
          Вийти
        </li>
      </ul>
    </div>
  );
};

export default ProfileMenu;
