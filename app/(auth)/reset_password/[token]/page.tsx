"use client";

import { usePathname } from "next/navigation";
import { ResetPasswordForm } from "@/components/ResetPassword/ResetPasswordForm";
import { ClientComponent } from "@/components/ClientComponent";

export default function Resetpassword() {
  const pathname = usePathname();
  const tokenValue = pathname.substring(16, pathname.length);

  return (
    <ClientComponent>
      <div className="container">
        <h1 className="mt-4 mb-2 text-2xl leading-140 font-pangram font-bold text-title">
          Відновлення паролю
        </h1>
        <p className="mb-6 text-common font-medium text-sm leading-129">
          Вкажіть новий пароль
        </p>
        <ResetPasswordForm confirmationToken={tokenValue} />
      </div>
    </ClientComponent>
  );
}
