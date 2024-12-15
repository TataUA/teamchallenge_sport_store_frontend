"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { ResetPasswordRequestForm } from "@/components/Auth/ResetPassword/ResetPasswordRequestForm";
import { ConfirmingLetterContent } from "@/components/Auth/ConfirmEmail/ConfirmingLetterContent";

// utils
import { cn } from "@/services/utils/cn";

// store
import { selectCart } from "@/redux/cart/cartSelector";
import { selectUserData } from "@/redux/auth/authSelector";
import { currentUserThunk } from "@/redux/auth/authThunk";
import { AppDispatch } from "@/redux/store";

//hooks
import { useIsMobile } from "@/hooks/useIsMobile";
import { useCartSync } from "@/hooks/useCartSync";

// helpers
import getUserlogged from "@/helpers/getUserlogged";

const HeaderNavLink = () => {
  const cart = useSelector(selectCart);
  const user = useSelector(selectUserData);

  useCartSync();

  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const isMobile = useIsMobile();

  const [isUser, setIsUser] = useState(user);
  const [showModal, setShowModal] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [showConfirmRegister, setShowConfirmRegister] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!user && accessToken) {
      dispatch(currentUserThunk()).unwrap();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    setShowConfirmRegister(false);
  };

  const handleUserEmail = (email: string) => setUserEmail(email);

  return (
    <>
      <ul className="flex items-center gap-1 xl:gap-x-2.5">
        {headerNav.map(({ href, name }) => (
          <li className="py-2 px-2 h-10" key={name}>
            {name === "search" ? (
              <SearchComponent />
            ) : name === "user" ? (
              <span onClick={handleUserClick} className="cursor-pointer ">
                {iconsData.map((icon) => {
                  return (
                    icon.name === name && (
                      <>
                        {user ? (
                          <span>{getUserlogged()}</span>
                        ) : (
                          <SvgComponent
                            key={icon.name}
                            viewBox={icon.viewBox}
                            path={icon.path}
                          />
                        )}
                      </>
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
                        className="hover:opacity-100  cursor-pointer "
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
          {showConfirmRegister ? (
            <ConfirmingLetterContent
              setShowConfirmRegister={setShowConfirmRegister}
              setShowModal={setShowModal}
              email={userEmail}
            />
          ) : showRegistration ? (
            <RegisterPageContent
              setShowRegistration={setShowRegistration}
              setShowConfirmRegister={setShowConfirmRegister}
              saveUserEmail={handleUserEmail}
            />
          ) : showResetPassword ? (
            <ResetPasswordRequestForm
              setShowResetPassword={setShowResetPassword}
            />
          ) : (
            <LoginPageContent
              setShowModal={setShowModal}
              setShowRegistration={setShowRegistration}
              setShowConfirmRegister={setShowConfirmRegister}
              setShowResetPassword={setShowResetPassword}
              saveUserEmail={handleUserEmail}
            />
          )}
        </ModalForm>
      )}
    </>
  );
};

export default HeaderNavLink;
