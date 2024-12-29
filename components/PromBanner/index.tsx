import Image from "next/image";
import Link from "next/link";

export default async function PromBanner() {
  return (
    <section className="container py-12 xl:pb-[62px]">
      <div className="relative w-full h-full xl:min-h-[432px] max-h-[432px] aspect-ratio-[342/268] xl:aspect-auto rounded-2xl overflow-hidden">
        <Image
          src="/images/prom-banner/prom-banner-mobile.jpg"
          alt="Банер"
          width={342}
          height={268}
          className="xl:hidden object-cover w-full h-full"
        />
        <Image
          src="/images/prom-banner/prom-banner-desktop.jpg"
          alt="Банер"
          width={1320}
          height={432}
          priority
          className="hidden xl:block object-cover w-full h-full"
        />
        <div className="absolute z-10 left-4 xl:left-10 bottom-6 xl:bottom-10 text-white">
          <h2 className="mb-2 font-semibold text-base xl:text-2xl">
            Palermo Vintage Sneakers Collection
          </h2>
          <p className="max-w-[310px] xl:max-w-[575px] mb-4 xl:mb-6 font-medium text-sm xl:text-base tracking-custom_4">
            Максимальний комфорт для активного життя. Обирайте найкраще для
            ваших досягнень!
          </p>
          <Link
            href="/product/83"
            className="flex items-center justify-center w-[116px] xl:w-[144px] h-8 xl:h-12 px-4 xl:px-6 border rounded-lg xl:rounded-xl font-semibold text-sm xl:text-base tracking-custom_2 bg-transparent hover:bg-[#0e0e10]/20 transition"
          >
            Детальніше
          </Link>
        </div>
      </div>
    </section>
  );
}
