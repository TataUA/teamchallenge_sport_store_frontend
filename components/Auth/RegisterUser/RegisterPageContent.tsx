import React from "react";

import { ClientComponent } from "@/components/ClientComponent";
import { PrivateRouteComponent } from "@/components/PrivateRouterComponent";
import { RegisterForm } from "@/components/Auth/RegisterUser/RegisterForm";
import { PrivacyPolicy } from "@/components/Auth/PrivacyPolicy";

export interface RegisterPageContentProps {
  setShowRegistration?: (show: boolean) => void;
  setShowConfirmRegister?: (show: boolean) => void;
  saveUserEmail?: (email: string) => void;
}

export const RegisterPageContent = (props: RegisterPageContentProps) => {
  return (
    <ClientComponent>
      <PrivateRouteComponent>
        <div>
          <h1 className="mb-6 text-2xl leading-140 font-pangram font-bold text-title">
            Реєстрація
          </h1>
          <RegisterForm
            setShowRegistration={props.setShowRegistration}
            setShowConfirmRegister={props.setShowConfirmRegister}
            saveUserEmail={props.saveUserEmail}
          />
          <PrivacyPolicy />
        </div>
      </PrivateRouteComponent>
    </ClientComponent>
  );
};
