"use client";

import { ResetPasswordForm } from "@/components/Auth/ResetPassword/ResetPasswordForm";
import { ClientComponent } from "@/components/ClientComponent";

export default function Page() {
  return (
    <ClientComponent>
      <div className="container">
        <h1 className="mt-4 mb-2 text-2xl leading-140 font-pangram font-bold text-title">
          Відновлення паролю
        </h1>
        <p className="mb-6 text-common font-medium text-sm leading-129">
          Вкажіть новий пароль
        </p>
        <ResetPasswordForm />
      </div>
    </ClientComponent>
  );
}
