import Link from "next/link";
import Image from "next/image";

import { PopularCategories } from "@/public/data/popular-categories.data";

export const SliderItem = ({ item }: { item: PopularCategories }) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Link
        href={item.href}
        className="flex flex-col justify-start gap-2 w-full h-full cursor-pointer"
      >
        <div className="relative w-full h-full overflow-hidden rounded-xl">
          <Image
            src={item.image}
            alt={item.title}
            width={300}
            height={300}
            priority
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-black/0"></div>
        </div>
        <h3 className="text-left w-[100px] md:w-full h-10 xl:h-7 xl:absolute z-10 left-6 bottom-6 font-medium text-sm xl:text-xl tracking-custom_2 text-title xl:text-white">
          {item.title}
        </h3>
      </Link>
    </div>
  );
};
