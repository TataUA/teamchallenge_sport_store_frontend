"use client";

import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { SliderButtons } from "./SliderButtons";

import { cn } from "@/services/utils/cn";
import Link from "next/link";

interface Slide {
  id?: number;
  title?: string;
  subtitle?: string;
  href?: string;
  image: string;
}

interface SliderProps {
  data: Slide[];
  autoPlay?: boolean;
  homePageMainSlider?: boolean;
  cardImage?: boolean;
  popularCat?: boolean;
  productsList?: boolean;
  slidesPerView?: number;
  className?: string;
}

export function Slider({
  data,
  autoPlay = true,
  cardImage,
  popularCat,
  slidesPerView = 1,
  className = "",
}: SliderProps) {
  return (
    <section className="w-full">
      <div className={cn("", className)}>
        <ul className="h-full w-full">
          <Swiper
            className="h-full"
            pagination={
              popularCat
                ? false
                : {
                    type: "bullets",
                    clickable: true,
                    renderBullet: (index, className) => {
                      const bulletElement = document.createElement("span");

                      document.documentElement.style.setProperty(
                        "--swiper-theme-color",
                        "#0A4CF6",
                      );

                      document.documentElement.style.setProperty(
                        "--swiper-pagination-bullet-inactive-color",
                        "#ffffff",
                      );

                      document.documentElement.style.setProperty(
                        "--swiper-pagination-bullet-inactive-opacity",
                        "1",
                      );
                      document.documentElement.style.setProperty(
                        "--swiper-pagination-bullet-horizontal-gap",
                        "2px",
                      );

                      bulletElement.className = `${className}`;

                      return bulletElement.outerHTML;
                    },
                  }
            }
            slidesPerView={slidesPerView}
            autoplay={autoPlay}
            loop={true}
            modules={[Autoplay, Navigation, Pagination]}
          >
            {data?.map(({ id, image, title, subtitle, href }) => (
              <SwiperSlide key={id || image}>
                {cardImage ? (
                  <div className="rounded-xl overflow-hidden">
                    <Image
                      alt=""
                      style={{ objectFit: "contain" }}
                      src={image}
                      width={850}
                      height={1300}
                    />
                  </div>
                ) : popularCat ? (
                  <div className="mr-2 md:mr-[25px] ">
                    <Link href={href}>
                      <div className="w-[108px] h-[108px] overflow-hidden rounded-xl mb-2 flex  justify-center md:w-[424px] md:h-[300px] md:relative">
                        <Image
                          width={108}
                          height={108}
                          src={image}
                          alt=""
                          className="object-center object-cover md:w-[424px] md:h-[300px] "
                        />
                      </div>
                      <h3 className="text-sm font-medium w-24 md:absolute md:bottom-6 md:left-10 md:w-full md:text-white md:text-xl tracking-[0.015]">
                        {title}
                      </h3>
                    </Link>
                  </div>
                ) : (
                  <div
                    className={cn(
                      "h-full w-full absolute left-0 top-0 bg-grey-900",
                    )}
                    style={{
                      background: image
                        ? `center center / cover scroll no-repeat url(${image})`
                        : undefined,
                    }}
                  ></div>
                )}
                {popularCat ? (
                  <></>
                ) : (
                  <div className="relative z-10 h-full  flex items-center justify-left">
                    <div className="w-3/6 ml-10">
                      {title && (
                        <p className="mb-8 font-normal text-xl  text-white">
                          {title}
                        </p>
                      )}
                      <p className="text-4xl font-semibold text-white">
                        {subtitle}
                      </p>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </ul>
      </div>
    </section>
  );
}
