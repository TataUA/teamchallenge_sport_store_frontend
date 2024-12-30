"use client";

import { useState } from "react";
import Link from "next/link";

import { FormBannerButton } from "@/components/SubscribeBannerFooter/FormBannerFooter/FormBannerButton";

export const FormBanerFooter = () => {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target?.value);
  };

  const handleSubscribeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email?.length) {
      return;
    }

    setSubmitted(true);
    setEmail("");

    // TODO update action - data should be saved into DB,
    // TODO we will implement it after backend is ready
    // at the moment icon successed appears only
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <form
      autoComplete="on"
      onSubmit={handleSubscribeSubmit}
      className="text-white xl:text-title"
    >
      <h2 className="mb-3 font-bold text-[28px] xl:text-[30px] leading-129">
        Отримуйте спеціальні пропозиції першими
      </h2>
      <p className="mb-4 xl:mb-8 font-medium text-sm tracking-custom_4 xl:tracking-custom_2">
        Залиш свою електронну пошту, щоб бути в курсі про актуальні новинки та
        акції
      </p>

      <div className="flex justify-between xl:mb-4">
        <input
          className="mb-2 xl:mb-0 w-full xl:w-[447px] h-[52px] xl:h-14 pt-5 xl:pt-6 pb-2 border-b border-border outline-none bg-transparent text-inherit placeholder-label  focus-visible:border-active_blue"
          type="email"
          value={email}
          placeholder="Електронна пошта"
          onChange={handleEmailChange}
        />
        <div className="hidden xl:inline-block">
          <FormBannerButton disabled={submitted} />
        </div>
      </div>

      <p className="mb-4 font-medium text-xs text-timer tracking-custom_2">
        Натискаючи кнопку “Підписатись”, ви даєте згоду на обробку персональних
        даних згідно{" "}
        <Link href="" className="border-b border-border">
          Політики конфіденційності
        </Link>
      </p>

      <div className="xl:hidden">
        <FormBannerButton disabled={submitted} />
      </div>
    </form>
  );
};
