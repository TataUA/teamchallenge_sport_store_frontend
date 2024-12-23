import Image from "next/image";
import Link from "next/link";

import { cn } from "@/services/utils/cn";

export default async function PromBanner() {
  return (
    <section className="container py-12 xl:pt-[48px] xl:pb-[62px]">
      <div className="relative w-[342px] h-[268px] xl:w-[1320px] xl:h-[432px] mx-auto rounded-2xl">
        <div className="z-[-1] absolute xl:relative xl:hidden w-full h-full bg-slate-300 overflow-hidden rounded-2xl">
          <Image
            src="/images/prom-banner/prom-banner-mobile.jpg"
            alt="image"
            quality={100}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        <div className="relative z-[-1] hidden xl:absolute xl:block w-full h-full overflow-hidden rounded-2xl">
          <Image
            src="/images/prom-banner/prom-banner-desktop.jpg"
            alt="image"
            quality={100}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        <div className="z-10 xl:w-[575px] px-4 xl:px-[40px] pt-[110px] xl:pt-[234px] pb-6 text-white">
          <h2
            className={cn(
              "mb-2 text-base font-bold",
              "xl:text-2xl font-semibold",
            )}
          >
            Palermo Vintage Sneakers Collection
          </h2>
          <p
            className={cn(
              "mb-5 text-sm leading-[18px] tracking-[0.04em]",
              "xl:mb-[35px] w-[575px] tracking-wider font-light",
            )}
          >
            Максимальний комфорт для активного життя. Обирайте найкраще для
            ваших досягнень!
          </p>
          <Link
            href="/product/83"
            className={cn(
              "min-w-[140px] tracking-[2%] bg-transparent rounded-lg px-[17px] py-[7px] border text-sm xl:px-[25px] xl:py-[14.5px] xl:rounded-xl xl:text-base hover:bg-[#0e0e10]/20",
            )}
          >
            Детальніше
          </Link>
        </div>
      </div>
    </section>
  );
}
