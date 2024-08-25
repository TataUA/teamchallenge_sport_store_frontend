"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/Button/Button";
import envelopSuccess from "@/public/icons/auth/envelop_blue_success.svg";

export default function Page() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/auth/login");
  };

  return (
    <div>
      <Image src={envelopSuccess} alt="Синій конверт" />
      <h1>Електронна пошта підтвредженна</h1>
      <p>Ваша електронна пошта була підтверджена та профіль успішно створено</p>

      <Button
        type="button"
        subtype="primary"
        title="На сторіку входу"
        onClick={handleRedirect}
      />
    </div>
  );
}
