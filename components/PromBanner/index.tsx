import { cn } from "@/services/utils/cn";
import Image from "next/image";
import Link from "next/link";

export default async function PromBanner() {
  return (
    <div className="relative rounded-2xl w-[342px] h-[268px] mx-auto mb-12">
      <div className="absolute  w-[100%] h-[100%] bg-slate-300 overflow-hidden z-[-1]  rounded-2xl">
        <Image
          src="/images/prom-banner/prom-banner-mobile.png"
          layout="fill"
          objectFit="cover"
          quality={100}
          alt="image"
        />
      </div>
      <div className="px-4 pt-[110px] pb-6 text-white z-10">
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
            "min-[2800px]:text-3xl",
          )}
        >
          Максимальний комфорт для активного життя. Обирайте найкраще для ваших
          досягнень!
        </p>
        <Link
          href="/product/83"
          className={cn(
            "min-w-[140px] tracking-[2%] bg-transparent rounded-lg px-4 py-[6px] border text-sm",
          )}
        >
          Детальніше
        </Link>
      </div>
    </div>
  );
}
