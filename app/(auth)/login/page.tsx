import React from "react";
import Link from "next/link";
import { ClientComponent } from "@/components/ClientComponent";
import { LoginForm } from "@/components/LoginForm";

export default function Page() {
  return (
    <div className="container">
      <h1 className="mt-4 mb-2 text-2xl font-bold text-title">Авторизація</h1>
      <p className="mb-6 text-sm font-medium text-common">
        Увійдіть або зареєструйтесь щоб продовжити
      </p>
      <ClientComponent>
        <LoginForm />
      </ClientComponent>
      <p className="mb-7 text-xs font-normal text-label">
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
      <div className="flex mb-5  justify-center items-center">
        <div className="w-full flex items-center">
          <div className="flex-1 h-px mr-3 bg-border"></div>
          <p className="text-sm font-medium text-secondary">або</p>
          <div className="flex-1 h-px ml-3 bg-border"></div>
        </div>
      </div>

      <Link
        href="/signup"
        className="flex items-center justify-center  w-full h-12 mb-2 px-6 border border-blue rounded-xl  bg-white text-base font-semibold text-blue hover:bg-blue hover:text-white transition-all"
      >
        Зареєструватись
      </Link>
    </div>
  );
}
