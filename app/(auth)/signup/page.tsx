import React from "react";
import { ClientComponent } from "@/components/ClientComponent";
import { RegisterForm } from "@/components/Auth/RegisterForm";
import { PrivacyPolicy } from "@/components/Auth/PrivacyPolicy";

export default function Page() {
  return (
    <div className="container">
      <h1 className="mt-4 mb-6 text-2xl leading-140 font-pangram font-bold text-title">
        Реєстрація
      </h1>
      <ClientComponent>
        <RegisterForm />
      </ClientComponent>
      <PrivacyPolicy />
    </div>
  );
}
