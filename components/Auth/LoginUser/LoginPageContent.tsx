"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { useIsMobile } from "@/hooks/useIsMobile";
import { ClientComponent } from "@/components/ClientComponent";
import { PrivateRouteComponent } from "@/components/Auth/PrivateRouterComponent";
import { LoginForm } from "@/components/Auth/LoginUser/LoginForm";
import { PrivacyPolicy } from "@/components/Auth/PrivacyPolicy";
import { Button } from "@/components/Button/Button";

interface LoginPageContentProps {
  setShowRegistration?: (show: boolean) => void;
  setShowConfirmRegister?: (show: boolean) => void;
  setShowResetPassword?: (show: boolean) => void;
  saveUserEmail?: (email: string) => void;
}

export const LoginPageContent = (props: LoginPageContentProps) => {
  const isMobile = useIsMobile();
  const router = useRouter();

  const handleRegistrationClick = () => {
    if (isMobile) {
      return router.push("/auth/signup");
    }
    props.setShowRegistration?.(true);
  };

  return (
    <>
      <ClientComponent>
        <PrivateRouteComponent>
          <div className="1440:w-[610px]">
            <h1 className="mb-2 1440:mb-4 text-2xl leading-140 font-pangram font-bold text-title">
              Авторизація
            </h1>
            <p className="mb-6 1440:mb-8 text-sm leading-129 font-pangram font-medium text-common">
              Увійдіть або зареєструйтесь щоб продовжити
            </p>
            <LoginForm
              setShowConfirmRegister={props.setShowConfirmRegister}
              setShowResetPassword={props.setShowResetPassword}
              saveUserEmail={props.saveUserEmail}
            />
            <PrivacyPolicy />
            <div className="flex mt-[21px] mb-[21px] justify-center items-center">
              <div className="w-full flex items-center">
                <div className="flex-1 h-px mr-3 bg-border"></div>
                <p className=" text-sm leading-129 font-medium font-pangram text-gray">
                  або
                </p>
                <div className="flex-1 h-px ml-3 bg-border"></div>
              </div>
            </div>
            <Button
              type="button"
              subtype="secondary"
              title="Зареєструватись"
              onClick={handleRegistrationClick}
            />
          </div>
        </PrivateRouteComponent>
      </ClientComponent>
    </>
  );
};
