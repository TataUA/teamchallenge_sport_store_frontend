"use client";

import Image from "next/image";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { IProduct } from "@/services/types";
import { cn } from "@/services/utils/cn";
import ListItem from "@/components/ProductsList/ListItem";

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
  products?: IProduct[];
}

export function Slider({
  data,
  autoPlay = true,
  loop = true,
  cardImage,
  popularCat,
  bestSales,
  bestSalesItem,
  slidesPerView = 1,
  slidesPerViewDesktop,
  className = "",
  products = [],
}: SliderProps) {
  return (
    <section className="w-full">
      <div className={cn("", className)}>
        <ul className="h-full w-full">
          <Swiper
            className="h-full"
            pagination={
              popularCat || bestSales || bestSalesItem
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
            loop={loop}
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
                  <SwiperSlide key={product.id}>
                    <ListItem bestSales={true} product={product} />
                  </SwiperSlide>
                ))
              : data?.map(({ id, image, images, title, href }) => (
                  <SwiperSlide key={id}>
                    {cardImage ? (
                      <div className="rounded-xl overflow-hidden flex items-center justify-center h-full">
                        <Image
                          alt=""
                          style={{ objectFit: "contain" }}
                          src={image || ""}
                          width={850}
                          height={1300}
                        />
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
                        </Link>
                        <div className="absolute top-0 left-0 w-[108px] h-    [108px] overflow-hidden rounded-xl xl:w-[312px] xl:h-[180px] z-30 xl:bg-gradient-to-t from-black/20 to-black/0 xl:rounded-2xl"></div>

                        <h3 className="z-40 text-sm font-medium w-24 xl:absolute md:bottom-6 md:left-6 md:w-full xl:text-white xl:text-xl tracking-[0.015] xl:tracking-wide xl:mb-2">
                          {title}
                        </h3>
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
    </section>
  );
}
