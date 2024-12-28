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

import { useIsMobile } from "@/hooks/useIsMobile";
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
  colorCurrent?: string;
  autoPlay?: boolean;
  loop?: boolean;
  homePageMainSlider?: boolean;
  cardImage?: boolean;
  bestSales?: boolean;
  bestSalesItem?: boolean;
  productsList?: boolean;
  slidesPerView?: number;
  spaceBetween?: number;
  className?: string;
}

export const Slider = ({
  data = [],
  products = [],
  colorCurrent,
  autoPlay = true,
  loop = true,
  cardImage,
  bestSales,
  bestSalesItem,
  slidesPerView = 1,
  spaceBetween = 0,
  className = "",
}: SliderProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();
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
          <div className="w-[88px] mr-3 hidden 1440:flex flex-col rounded-xl">
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

      <div className={cn("h-full w-full", { "1440:w-[528px]": isProductPage })}>
        <Swiper
          className="h-full"
          slidesPerView={slidesPerView}
          spaceBetween={spaceBetween}
          autoplay={autoPlay}
          effect="slide"
          speed={500}
          loop={loop}
          loopAdditionalSlides={Math.max(slidesPerView, 2)}
          modules={[Autoplay, Navigation, Pagination]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
          }}
          pagination={
            bestSales || bestSalesItem || (cardImage && !isProductPage)
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
        >
          <ul>
            {bestSales
              ? products.map((product) => (
                  <SwiperSlide key={uuidv4()}>
                    <ListItem bestSales={true} product={product} />
                  </SwiperSlide>
                ))
              : data?.map(({ image, images, title, href }) => (
                  <SwiperSlide
                    key={uuidv4()}
                    style={{ width: "100%", height: "auto" }}
                  >
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
                    ) : (
                      <div
                        className="relative w-full"
                        style={{
                          minHeight: isMobile ? "400px" : "624px",
                          maxHeight: "624px",
                          aspectRatio: isMobile ? "390 / 400" : "",
                        }}
                      >
                        <Link
                          href={href ?? "/"}
                          className="h-full w-full absolute left-0 top-0"
                          style={{
                            background:
                              images?.mobile && isMobile
                                ? `url(${images?.mobile})`
                                : images?.desktop
                                  ? `url(${images?.desktop})`
                                  : undefined,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                          }}
                        ></Link>
                      </div>
                    )}
                  </SwiperSlide>
                ))}
          </ul>
        </Swiper>
      </div>
    </div>
  );
};
