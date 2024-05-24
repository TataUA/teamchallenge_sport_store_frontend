import React from "react";
import Link from "next/link";
import { LoginForm } from "@/app/components/LoginForm";

export default function Page() {
  return (
    <>
      <h1 className="mb-2">Авторизація</h1>
      <p className="mb-6">Увійдіть або зареєструйтесь щоб продовжити</p>
      <LoginForm />
      <p>
        Натискаючи на кнопку я погоджуюсь з{" "}
        <Link href="" className="border-b-2">
          умовами політики конфіденційності
        </Link>{" "}
        та
        <Link href="" className="border-b-2">
          {" "}
          договором користувача
        </Link>
      </p>
      <p>або</p>
      <Link href="/signup" className="inline-block h-12 border-2">
        Зареєструватись
      </Link>
    </>
  );
}
