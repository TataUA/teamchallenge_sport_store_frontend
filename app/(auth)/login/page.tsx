import React from "react";
import Link from "next/link";
import { ClientComponent } from "@/components/ClientComponent";
import { PrivateRouteComponent } from "@/components/PrivateRouterComponent";
import { LoginForm } from "@/components/Auth/LoginForm";
import { PrivacyPolicy } from "@/components/Auth/PrivacyPolicy";

export default function Page() {
  return (
    <ClientComponent>
      <PrivateRouteComponent>
        <div className="container">
          <h1 className="mt-4 mb-2 text-2xl leading-140 font-pangram font-bold text-title">
            Авторизація
          </h1>
          <p className="mb-6 text-sm leading-129 font-pangram font-medium text-common">
            Увійдіть або зареєструйтесь щоб продовжити
          </p>

          <LoginForm />

          <PrivacyPolicy />
          <div className="flex mb-7 justify-center items-center">
            <div className="w-full flex items-center">
              <div className="flex-1 h-px mr-3 bg-border"></div>
              <p className=" text-sm font-medium leading-129 font-pangram text-gray">
                або
              </p>
              <div className="flex-1 h-px ml-3 bg-border"></div>
            </div>
          </div>

          <Link
            href="/signup"
            className="flex items-center justify-center  w-full h-12 mb-2 px-6 border border-blue rounded-xl  bg-white text-base font-pangram font-semibold text-blue hover:bg-active_lightblue transition-all"
          >
            Зареєструватись
          </Link>
        </div>
      </PrivateRouteComponent>
    </ClientComponent>
  );
}
