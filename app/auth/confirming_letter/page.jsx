"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/Button/Button";
import envelopBlue from "@/public/icons/auth/envelop_blue.svg";

export default function Page() {
  const router = useRouter();

  const handleResendEmail = () => {
    return;
  };

  const handleRedirect = () => {
    router.push("/auth/login");
  };

  return (
    <div>
      <Image src={envelopBlue} alt="Синій конверт" />
      <h1>Підтвердіть свою електронну пошту</h1>
      <p>
        Щоб завершити процес реєстрації підтвердіть свою електронну пошту,
        перейшовши за посиланням, надісланим на <span>ivanenko@gmail.com</span>
      </p>
      <p>
        Не отримали листа? Перевірте папку &#34;Спам&#34; або натисніть кнопку
        &#34;Надіслати лист повторно&#34;
      </p>

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
  );
}
