import React from "react";
import Link from "next/link";
import { RegisterForm } from "@/app/components/RegisterForm";

export default function Page() {
  return (
    <>
      <h1 className="mb-6">Реєстрація</h1>
      <RegisterForm />
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
