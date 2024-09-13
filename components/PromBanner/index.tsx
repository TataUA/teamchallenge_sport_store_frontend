import { cn } from "@/services/utils/cn";
import Image from "next/image";
import Link from "next/link";

export default async function PromBanner() {
  return (
    <section className=" mx-auto py-12 xl:px-[60px] xl:py-[52px]">
      <div className=" mx-auto relative rounded-2xl w-[342px] h-[268px]  xl:w-[1320px]  xl:h-[432px] ">
        <div className="absolute  w-[100%] h-[100%] bg-slate-300 overflow-hidden z-[-1]  rounded-2xl  xl:hidden">
          <Image
            src="/images/prom-banner/prom-banner-mobile.png"
            layout="fill"
            objectFit="cover"
            quality={100}
            alt="image"
          />
        </div>
        <div className="hidden w-[100%] h-[100%] overflow-hidden rounded-2xl z-[-1] xl:absolute xl:block ">
          <Image
            src="/images/prom-banner/prom-banner-desktop.png"
            layout="fill"
            objectFit="cover"
            quality={100}
            alt="image"
          />
        </div>
        <div className="px-4 pt-[110px] pb-6 text-white z-10 xl:pt-[236px] xl:w-[575px] xl:px-[40px]">
          <h2
            className={cn(
              "text-base mb-2 font-bold",
              "md:text-xl ",
              "min-[2800px]:text-5xl",
            )}
          >
            Palermo Vintage Sneakers Collection
          </h2>
          <p
            className={cn(
              "text-sm leading-[18px] tracking-[0.04em] mb-4",
              "md:text-base",
              "xl:mb-6",
              "min-[2800px]:text-3xl",
            )}
          >
            Максимальний комфорт для активного життя. Обирайте найкраще для
            ваших досягнень!
          </p>
          <Link
            href="/product/83"
            className={cn(
              "min-w-[140px] tracking-[2%] bg-transparent rounded-lg px-4 py-[6px] border text-sm xl:px-6 xl:py-3",
            )}
          >
            Детальніше
          </Link>
        </div>
      </div>
    </section>
  );
}
