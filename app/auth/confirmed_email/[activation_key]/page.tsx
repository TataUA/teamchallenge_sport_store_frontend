"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/Button/Button";
import envelopSuccess from "@/public/icons/auth/envelop_blue_success.svg";
import { cn } from "@/services/utils/cn";

export default function Page() {
  const router = useRouter();

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
        src={envelopSuccess}
        alt="Синій конверт з зеленою галочкою"
        className="h-[152px] w-[152px] mt-[164px] mb-8"
      />
      <h1 className="mb-4 font-bold text-2xl leading-140 text-title">
        Електронна пошта підтвредженна
      </h1>
      <p className="mb-12 font-medium text-sm text-common">
        Ваша електронна пошта була підтверджена та профіль успішно створено
      </p>
      <Button
        type="button"
        subtype="primary"
        title="На сторіку входу"
        onClick={handleRedirect}
      />
    </div>
  );
}
