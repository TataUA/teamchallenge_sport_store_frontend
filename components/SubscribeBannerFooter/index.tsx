"use client";

import { useState } from "react";
import Image from "next/image";

// utils
import { cn } from "@/services/utils/cn";

// assets
import bannerMobile from "../../public/images/footer/special-proposition-mobile.jpg";
import bannerDesk from "../../public/images/footer/special-proposition-desk.jpg";
import getSuccessBlueIcon from "@/helpers/getSuccessBlueIconSVG";
// css

const SubscribeBannerFooter = () => {
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
    <section className="relative xl:h-[469px]">
      <div className="absolute z-[1] w-[100%] h-[100%]">
        <Image
          src={bannerMobile}
          layout="fill"
          objectFit="cover"
          quality={100}
          alt="image"
        />
      </div>
      <div className=" collor-substrate absolute left-0 top-0 w-full h-full z-[5]  bg-[#151515]  opacity-60 xl:hidden"></div>
      <div
        className={cn(
          "pt-[42px] px-6 pb-[42px] min-h-[396px] relative z-[10] text-white",
        )}
      >
        <form onSubmit={handleSubscribeSubmit}>
          <div
            className={cn(
              "font-extrabold min-h-[72px] align-middle leading-9",
              "max-[767px]:text-[28px] max-[767px]:mb-2",
              "min-[2800px]:text-7xl",
            )}
          >
            Отримуйте спеціальні пропозиції першими
          </div>
          <p
            className={cn(
              "mt-3 text-[14px] mb-2 tracking-wider",
              "min-[767px]:text-[14px] max-[767px]:mb-9",
              "min-[2800px]:text-3xl",
            )}
          >
            Залиш свою електронну пошту, щоб бути в курсі про актуальні новинки
            та акції
          </p>
          <input
            className={cn(
              "bg-transparent border-b-[1px] text-inherit placeholder-gray-500 mb-[6px]  pb-1.5 focus-visible:border-[blue] outline-none text-base  placeholder-[#868687] placeholder-[0.025em] ",
              "max-[767px]:w-[100%]",
              "min-[2800px]:mb-12 min-[2800px]:text-3xl",
            )}
            type="email"
            value={email}
            placeholder="Електронна пошта"
            onChange={handleEmailChange}
          />
          <p
            className={cn(
              "leading-4 text-[#aaaaac] text-[12px]  tracking-wide opacity-100",
              "min-[767px]:text-base leading-4 max-[767px]:mb-[0]",
              "min-[2800px]:text-3xl",
            )}
          >
            Натискаючи кнопку “Підписатись”, ви даєте згоду на обробку
            персональних даних згідно{" "}
            <span className="underline">Політики конфіденційності </span>
          </p>
          <br />
          <button
            disabled={submitted}
            className={cn(
              "mt-[-6px] text-[#1A1A1C] min-w-[148px] py-3 px-6 bg-white rounded-2xl tracking-wide font-semibold hover:opacity-70 disabled:hover:opacity-100",
              "max-[767px]:px-6 max-[767px]:rounded-xl",
              "min-[2800px]:text-3xl min-[2800px]:min-w-[235px]",
            )}
          >
            {submitted ? (
              <span className="[&>svg]:w-5 [&>svg]:h-5 [&>svg]:m-auto min-[2800px]:[&>svg]:w-8 min-[2800px]:[&>svg]:h-9">
                {getSuccessBlueIcon()}
              </span>
            ) : (
              "Підписатися"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default SubscribeBannerFooter;
