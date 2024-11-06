"use client";

//import { useState } from "react";
import Image from "next/image";

// utils
import { cn } from "@/services/utils/cn";

import FormBanerFooter from "./FormBanerFooter";

// assets
import bannerMobile from "../../public/images/footer/special-proposition-mobile.jpg";
import bannerDesk from "../../public/images/footer/special-proposition-desk.jpg";
//import getSuccessBlueIcon from "@/helpers/getSuccessBlueIconSVG";
// css

const SubscribeBannerFooter = () => {
  // const [submitted, setSubmitted] = useState(false);
  // const [email, setEmail] = useState("");

  // const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setEmail(event.target?.value);
  // };

  // const handleSubscribeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   if (!email?.length) {
  //     return;
  //   }

  //   setSubmitted(true);
  //   setEmail("");

  //   // TODO update action - data should be saved into DB,
  //   // TODO we will implement it after backend is ready
  //   // at the moment icon successed appears only
  //   setTimeout(() => {
  //     setSubmitted(false);
  //   }, 3000);
  // };

  return (
    <section className="relative h-[396px] xl:h-[469px]">
      <div className="absolute z-[1] w-[100%] h-[100%]">
        <Image
          src={bannerMobile}
          layout="fill"
          objectFit="cover"
          quality={100}
          alt="image"
        />
      </div>
      <div className="md:hidden">
        <div className=" collor-substrate absolute left-0 top-0 w-full h-full z-[5]  bg-[#151515]  opacity-60 "></div>
        <div
          className={cn(
            "pt-[42px] px-6 pb-[42px] min-h-[396px] relative z-[10] text-white ",
          )}
        >
          <FormBanerFooter />
        </div>
      </div>
    </section>
  );
};

export default SubscribeBannerFooter;
