"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { cn } from "@/services/utils/cn";
import { Button } from "@/components/Button/Button";
import envelopBlue from "@/public/icons/auth/envelop_blue.svg";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const handleResendEmail = () => {
    return;
  };

  const handleRedirect = () => {
    router.push("/auth/login");
  };

  return (
    <div
      className={cn(
        "container",
        "w-full flex flex-col justify-center items-center self-center text-center font-pangram",
      )}
    >
      <Image
        src={envelopBlue}
        alt="Синій конверт"
        className="h-[152px] w-[152px] mt-[94px] mb-8"
      />
      <h1 className="mb-4 font-bold text-2xl leading-140 text-title">
        Підтвердіть свою електронну пошту
      </h1>
      <p className="mb-6 font-medium text-sm text-common">
        Щоб завершити процес реєстрації підтвердіть свою електронну пошту,
        перейшовши за посиланням, надісланим на{" "}
        <span className="font-semibold">{email}</span>
      </p>
      <p className="mb-12 font-medium text-xs text-secondary">
        Не отримали листа? Перевірте папку &#34;Спам&#34; або натисніть кнопку
        &#34;Надіслати лист повторно&#34;
      </p>
      <div className="w-full flex flex-col gap-4">
        <Button
          type="submit"
          subtype="primary"
          title="Надіслати лист повторно"
          onClick={handleResendEmail}
        />
        <Button
          type="button"
          subtype="secondary"
          title="На сторіку входу"
          onClick={handleRedirect}
        />
      </div>
    </div>
  );
}
