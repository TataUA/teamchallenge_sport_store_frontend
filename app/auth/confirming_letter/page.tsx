"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { cn } from "@/services/utils/cn";
import { ClientComponent } from "@/components/ClientComponent";
import { ConfirmationButtons } from "@/components/Auth/ConfirmEmail/ConfirmationButtons";
import envelopBlue from "@/public/icons/auth/envelop_blue.svg";

export default function Page() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

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
      <p className="mb-4 font-medium text-sm text-common">
        Щоб завершити процес реєстрації підтвердіть свою електронну пошту,
        перейшовши за посиланням, надісланим на{" "}
        <span className="font-semibold">{email}</span>
      </p>
      <p className="mb-12 font-medium text-sm text-common">
        Будь ласка, зверніть увагу, що посилання буде дійсним лише протягом 30
        хвилин.
      </p>
      <p className="mb-12 font-medium text-xs text-secondary">
        Не отримали листа? Перевірте папку &#34;Спам&#34; або натисніть кнопку
        &#34;Надіслати лист повторно&#34;
      </p>
      <ClientComponent>
        <ConfirmationButtons />
      </ClientComponent>
    </div>
  );
}
