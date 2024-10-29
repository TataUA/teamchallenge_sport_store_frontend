"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

import { cn } from "@/services/utils/cn";

import { ClientComponent } from "@/components/ClientComponent";
import { ResendLinkButton } from "@/components/Auth/ConfirmEmail/ResendLinkButton";
import { Button } from "@/components/Button/Button";

import envelopBlue from "@/public/icons/auth/envelop_blue.svg";

import { resendEmailThunk } from "@/redux/auth/authThunk";

import { useIsMobile } from "@/hooks/useIsMobile";

export default function Page() {
  const searchParams = useSearchParams();

  const router = useRouter();

  const email = searchParams.get("email") || "";

  const isMobile = useIsMobile();

  const handleRedirect = () => {
    if (isMobile) {
      router.push("/auth/login");
    } else router.push("/");
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
      <p className="mb-4 font-medium text-sm text-common">
        Щоб завершити процес реєстрації підтвердіть свою електронну пошту,
        перейшовши за посиланням, надісланим на{" "}
        <span className="font-semibold">{email}</span>
      </p>
      <p className="mb-12 font-medium text-sm text-common">
        Будь ласка, зверніть увагу, що посилання буде дійсним лише протягом 3
        хвилин.
      </p>
      <p className="mb-12 font-medium text-xs text-secondary">
        Не отримали листа? Перевірте папку &#34;Спам&#34; або натисніть кнопку
        &#34;Надіслати лист повторно&#34;
      </p>
      <ClientComponent>
        <div className="w-full mb-4">
          <ResendLinkButton
            email={email}
            resendButtonTitle="Надіслати лист повторно"
            resendThunk={resendEmailThunk}
          />
        </div>
        <Button
          type="button"
          subtype="primary"
          title={isMobile ? "На сторіку входу" : "На головну сторінку"}
          onClick={handleRedirect}
        />
      </ClientComponent>
    </div>
  );
}
