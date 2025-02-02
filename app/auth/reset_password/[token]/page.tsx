"use client";

import { ResetPasswordForm } from "@/components/Auth/ResetPassword/ResetPasswordForm";
import { ClientComponent } from "@/components/ClientComponent";

export default function Page() {
  return (
    <ClientComponent>
      <div className="container 1440:h-full 1440:flex items-center justify-center">
        <div className="w-full 1440:w-[504px] 1440:my-4 1440:p-10 1440:border 1440:border-border 1440:rounded-3xl 1440:shadow-custom">
          <h1 className="mt-4 1440:mt-0 mb-2 text-2xl leading-140 font-pangram font-bold text-title">
            Відновлення паролю
          </h1>
          <p className="mb-6 text-common font-pangram font-medium text-sm leading-129">
            Вкажіть новий пароль
          </p>
          <ResetPasswordForm />
        </div>
      </div>
    </ClientComponent>
  );
}
