"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { v4 as uuidv4 } from "uuid";

import { cn } from "@/services/utils/cn";
import { IProduct } from "@/services/types";
import ListItem from "@/components/ProductsList/ListItem";
import { SliderButtons } from "@/components/Slider/SliderArrowButtons";

interface Slide {
  id?: number;
  title?: string;
  link?: string;
  href?: string;
  image?: string;
  images?: {
    mobile: string;
    desktop: string;
  };
}

interface SliderProps {
  data?: Slide[];
  products?: IProduct[];
  colorCurrent: string;
  autoPlay?: boolean;
  loop?: boolean;
  homePageMainSlider?: boolean;
  cardImage?: boolean;
  popularCat?: boolean;
  bestSales?: boolean;
  bestSalesItem?: boolean;
  productsList?: boolean;
  slidesPerView?: number;
  slidesPerViewDesktop?: number;
  className?: string;
}

export const Slider = ({
  data = [],
  products = [],
  colorCurrent,
  autoPlay = true,
  loop = true,
  cardImage,
  popularCat,
  bestSales,
  bestSalesItem,
  slidesPerView = 1,
  slidesPerViewDesktop,
  className = "",
}: SliderProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const swiperRef = useRef<SwiperType | null>(null);
  const pathname = usePathname();
  const isProductPage = pathname?.startsWith("/product/");

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(0);
    }
  }, [colorCurrent]);

  const handleThumbnailClick = (index: number) => {
    if (!swiperRef.current) return;

    const swiper = swiperRef.current;

    swiper.slideTo(index);
    setActiveIndex(index);
  };

  return (
    <div className={cn("w-full flex", className)}>
      <div>
        {isProductPage && (
          <div className="w-[88px] mr-3  hidden 1440:flex flex-col rounded-xl">
            {data?.map((item, index) => (
              <div
                key={uuidv4()}
                className={cn(
                  "mb-2 cursor-pointer rounded-xl overflow-hidden",
                  activeIndex === index ? "border-2 border-border" : "",
                )}
                onClick={() => handleThumbnailClick(index)}
              >
                <Image
                  alt={item.title || "image"}
                  src={item.image || ""} // додати зображення-заглушку до цих умов
                  width={88}
                  height={134}
                  style={{
                    objectFit: "contain",
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <ul className={cn("h-full w-full", { "1440:w-[528px]": isProductPage })}>
        <Swiper
          className="h-full"
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
          }}
          pagination={
            popularCat ||
            bestSales ||
            bestSalesItem ||
            (cardImage && !isProductPage)
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
                      "#FFFFFF",
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
          effect="slide"
          speed={500}
          loop={loop}
          loopAdditionalSlides={1}
          modules={[Autoplay, Navigation, Pagination]}
          breakpoints={{
            0: {
              slidesPerView: slidesPerView,
            },
            1440: {
              slidesPerView: slidesPerViewDesktop || slidesPerView,
            },
          }}
        >
          {bestSales
            ? products.map((product) => (
                <SwiperSlide key={uuidv4()}>
                  <ListItem bestSales={true} product={product} />
                </SwiperSlide>
              ))
            : data?.map(({ image, images, title, href }) => (
                <SwiperSlide key={uuidv4()}>
                  {cardImage ? (
                    <div className="max-w-[850px] mx-auto relative flex items-center justify-center rounded-2xl 1440:rounded-[20px] overflow-hidden group">
                      <Image
                        alt={title || "image"}
                        src={image || ""}
                        width={850}
                        height={1300}
                        priority
                        style={{
                          objectFit: "contain",
                        }}
                      />
                      {isProductPage && <SliderButtons />}
                    </div>
                  ) : popularCat ? (
                    <li className="relative mr-2 xl:mr-6">
                      <Link href={href ?? "/"}>
                        <div className="relative w-[108px] h-[108px] overflow-hidden rounded-xl mb-2 flex  justify-center xl:w-[312px] xl:h-[180px]  xl:rounded-2xl">
                          <Image
                            width={108}
                            height={108}
                            src={image || ""}
                            alt=""
                            className="object-center object-cover xl:w-full xl:h-full "
                          />
                        </div>
                        /{" "}
                      </Link>
                      <div className="absolute top-0 left-0 w-[108px] h-    [108px] overflow-hidden rounded-xl xl:w-[312px] xl:h-[180px] z-30 xl:bg-gradient-to-t from-black/20 to-black/0 xl:rounded-2xl"></div>
                      <h3 className="z-40 text-sm font-medium w-24 xl:absolute md:bottom-6 md:left-6 md:w-full xl:text-white xl:text-xl tracking-[0.015] xl:tracking-wide xl:mb-2">
                        {title}
                      </h3>{" "}
                    </li>
                  ) : (
                    <div className="xl:h-[624px]">
                      <Link
                        href={href ?? "/"}
                        className={cn(
                          "h-full w-full absolute left-0 top-0",
                          "xl:hidden",
                        )}
                        style={{
                          background: images
                            ? `center center / cover scroll no-repeat url(${images.mobile})`
                            : undefined,
                        }}
                      ></Link>
                      <Link
                        href={href ?? "/"}
                        className={cn(
                          "hidden h-full w-full absolute left-0 top-0",
                          "xl:block",
                        )}
                        style={{
                          background: images
                            ? `center center / cover scroll no-repeat url(${images.desktop})`
                            : undefined,
                        }}
                      ></Link>
                    </div>
                  )}
                </SwiperSlide>
              ))}
        </Swiper>
      </ul>
    </div>
  );
};
