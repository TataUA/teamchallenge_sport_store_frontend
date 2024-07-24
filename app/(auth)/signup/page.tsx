import React from "react";
import Link from "next/link";
import { ClientComponent } from "@/components/ClientComponent";
import { RegisterForm } from "@/components/Auth/RegisterForm";

export default function Page() {
  return (
    <div className="container">
      <h1 className="mt-4 mb-6 text-2xl font-bold text-title">Реєстрація</h1>
      <ClientComponent>
        <RegisterForm />
      </ClientComponent>
      <p className="text-xs font-normal text-label">
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
    </div>
  );
}
