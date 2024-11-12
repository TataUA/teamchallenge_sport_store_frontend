"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";

// data
import { headerNav, iconsData } from "@/constants";

// components
import SvgComponent from "@/components/SvgComponent/SvgComponent";
import SearchComponent from "@/components/SearchComponent";
import { ModalForm } from "@/components/Auth/ModalForm";
import { LoginPageContent } from "@/components/Auth/LoginUser/LoginPageContent";
import { RegisterPageContent } from "@/components/Auth/RegisterUser/RegisterPageContent";

// utils
import { cn } from "@/services/utils/cn";

// store
import { selectCart } from "@/redux/cart/cartSelector";
import { selectUserData } from "@/redux/auth/authSelector";

//hooks
import { useFetchCurrentUser } from "@/hooks/useFetchCurrentUser";
import { useIsMobile } from "@/hooks/useIsMobile";

// types
import { ResetPasswordRequestForm } from "@/components/Auth/ResetPassword/ResetPasswordRequestForm";

// hooks
import useCartManagement from "@/hooks/useCartManagement";

const HeaderNavLink = () => {
  const cart = useSelector(selectCart);
  const user = useSelector(selectUserData);

  useCartManagement();

  const router = useRouter();

  const isMobile = useIsMobile();

  const [showModal, setShowModal] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  useFetchCurrentUser();

  const handleUserClick = () => {
    if (user) {
      router.push("/auth/profile");
    } else {
      if (isMobile) {
        router.push("/auth/login");
      } else {
        setShowRegistration(false);
        setShowModal(true);
      }
    }
  };

  const handleCloseModalClick = () => {
    setShowModal(false);
    setShowResetPassword(false);
  };

  return (
    <>
      <ul className="flex items-center gap-1">
        {headerNav.map(({ href, name }) => (
          <li className="py-2 px-2 h-10" key={name}>
            {name === "search" ? (
              <SearchComponent />
            ) : name === "user" ? (
              <span onClick={handleUserClick} className="cursor-pointer">
                {iconsData.map((icon) => {
                  return (
                    icon.name === name && (
                      <SvgComponent
                        key={icon.name}
                        viewBox={icon.viewBox}
                        path={icon.path}
                      />
                    )
                  );
                })}
              </span>
            ) : (
              <Link href={href}>
                {iconsData.map((icon) => {
                  return (
                    icon.name === name && (
                      <span
                        key={icon.name}
                        className="[&>svg]:hover:opacity-[50%] cursor-pointer"
                      >
                        {name === "cart" && cart.products?.length ? (
                          <div
                            className={cn(
                              "relative z-20 bg-blue w-[18px] h-[18px] overflow-hidden rounded-full text-white flex justify-center items-center",
                              "font-semibold text-sm leading-4",
                              "left-[50%] top-[-25%] ",
                            )}
                          >
                            {cart.products?.length}
                          </div>
                        ) : null}
                        <SvgComponent
                          key={icon.name}
                          viewBox={icon.viewBox}
                          path={icon.path}
                          classname={cn("", {
                            "relative z-10 top-[-18px]":
                              name === "cart" && cart.products?.length,
                          })}
                        />
                      </span>
                    )
                  );
                })}
              </Link>
            )}
          </li>
        ))}
      </ul>

      {!isMobile && showModal && (
        <ModalForm onClose={handleCloseModalClick}>
          {showResetPassword ? (
            <ResetPasswordRequestForm
              setShowResetPassword={setShowResetPassword}
            />
          ) : showRegistration ? (
            <RegisterPageContent onClose={() => setShowModal(false)} />
          ) : (
            <LoginPageContent
              setShowRegistration={setShowRegistration}
              setShowResetPassword={setShowResetPassword}
              setShowModal={setShowModal}
            />
          )}
        </ModalForm>
      )}
    </>
  );
};

export default HeaderNavLink;
