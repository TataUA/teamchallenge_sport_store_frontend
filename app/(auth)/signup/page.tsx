import React from "react";
import Link from "next/link";
import { RegisterForm } from "@/components/RegisterForm";
import { ClientComponent } from "@/components/ClientComponent";

export default function Page() {
  return (
    <>
      <h1 className="mt-4 mb-6 text-2xl font-bold text-title">Реєстрація</h1>
      <ClientComponent>
        <RegisterForm />
      </ClientComponent>
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
    </>
  );
}
