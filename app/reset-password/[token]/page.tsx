'use client'
 
import { usePathname } from 'next/navigation'
import { ResetPasswordForm } from "@/components/reset-password/ResetPasswordForm";

export default function Resetpassword() {
  const pathname = usePathname();
  const tokenValue = pathname.substring(15, pathname.length);

  return (
    <div className="w-full h-screen bg-white p-6">
      <p className="text-title font-bold text-heading mb-2">Відновлення паролю</p>
      <p className="text-common font-medium text-basic mb-6">Вкажіть новий пароль</p>
      <ResetPasswordForm tokenValue={tokenValue} />
    </div>
  );
}
