"use client";

import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

// components
import UserInfo from "./UserInfo";

// store
import { AppDispatch } from "@/redux/store";
import { selectUserData } from "@/redux/auth/authSelector";
import { authModalOpen } from "@/redux/auth/authSlice";

//hooks
import { useIsMobile } from "@/hooks/useIsMobile";

const ContactsSection = ({ children }: { children: any }) => {
  const user = useSelector(selectUserData);
  const dispatch: AppDispatch = useDispatch();
  const isMobile = useIsMobile();

  return (
    <div className="md:col-start-1 md:row-start-1 mb-[40px] md:mb-[48px]">
      <div className="flex justify-between items-center flex-wrap gap-2 mb-4">
        <h3 className="text-[#1A1A1C] text-xl font-semibold min-[2800px]:text-3xl">
          Контактні дані
        </h3>
        {!user ? (
          <Link
            href={isMobile ? "/auth/login" : ""}
            onClick={() => {
              if (!isMobile) dispatch(authModalOpen());
            }}
            className="text-sm font-medium underline title"
          >
            У мене вже є аккаунт
          </Link>
        ) : null}
      </div>
      {user ? <UserInfo user={user} /> : <>{children}</>}
    </div>
  );
};

export default ContactsSection;
