import React from "react";
import { ClientComponent } from "@/components/ClientComponent";
import { PrivateRouteComponent } from "@/components/PrivateRouterComponent";
import { RegisterForm } from "@/components/Auth/RegisterForm";
import { PrivacyPolicy } from "@/components/Auth/PrivacyPolicy";

export default function Page() {
  return (
    <ClientComponent>
      <PrivateRouteComponent>
        <div className="container">
          <h1 className="mt-4 mb-6 text-2xl leading-140 font-pangram font-bold text-title">
            Реєстрація
          </h1>

          <RegisterForm />

          <PrivacyPolicy />
        </div>
      </PrivateRouteComponent>
    </ClientComponent>
  );
}
