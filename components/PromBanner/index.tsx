import { cn } from "@/services/utils/cn";
import Image from "next/image";
import Link from "next/link";

export default async function PromBanner() {
  return (
    <section className=" mx-auto py-12 xl:px-[60px] xl:py-[52px]">
      <div className=" mx-auto relative rounded-2xl w-[342px] h-[268px]  xl:w-[1320px]  xl:h-[432px] ">
        <div className="absolute  w-[100%] h-[100%] bg-slate-300 overflow-hidden z-[-1]  rounded-2xl  xl:hidden">
          <Image
            src="/images/prom-banner/prom-banner-mobile.jpg"
            layout="fill"
            objectFit="cover"
            quality={100}
            alt="image"
          />
        </div>
        <div className="hidden xl:w-[100%] xl:h-[100%] overflow-hidden rounded-2xl z-[-1] xl:absolute xl:block ">
          <Image
            src="/images/prom-banner/prom-banner-desktop.jpg"
            layout="fill"
            objectFit="cover"
            quality={100}
            alt="image"
          />
        </div>
        <div className="px-4 pt-[110px] pb-6 text-white z-10 xl:pt-[234px] xl:w-[575px] xl:px-[40px]">
          <h2
            className={cn(
              "text-base mb-2 font-bold",
              "md:text-xl ",
              "xl:text-2xl font-semibold",
              "min-[2800px]:text-5xl",
            )}
          >
            Palermo Vintage Sneakers Collection
          </h2>
          <p
            className={cn(
              "text-sm leading-[18px] tracking-[0.04em] mb-5",
              "md:text-base",
              "xl:mb-[34px] xl:w-[575px] xl:tracking-widest xl:font-medium",
              "min-[2800px]:text-3xl",
            )}
          >
            Максимальний комфорт для активного життя. Обирайте найкраще для
            ваших досягнень!
          </p>
          <Link
            href="/product/83"
            className={cn(
              "min-w-[140px] tracking-[2%] bg-transparent rounded-lg px-[17px] py-[7px] border text-sm xl:px-6 xl:py-[14px] xl:rounded-xl xl:text-base",
            )}
          >
            Детальніше
          </Link>
        </div>
      </div>
    </section>
  );
}
