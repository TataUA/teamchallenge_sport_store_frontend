import Link from "next/link";
import Image from "next/image";

import { cn } from "@/services/utils/cn";
import { PopularCategories } from "@/public/data/popular-categories.data";

export const SliderItem = ({ item }: { item: PopularCategories }) => {
  return (
    <div className="">
      <Link
        href={item.href ?? "/"}
        className="flex flex-col gap-2 w-full h-full cursor-pointer"
      >
        <div className="relative flex flex-col items-center justify-center w-full min-h-[108px] xl:min-h-[181px] max-h-[181px] rounded-xl overflow-hidden">
          <Image
            src={item.image || ""}
            alt={item.title}
            width={312}
            height={181}
            className="w-full h-full object-cover"
          />
          <div className="absolute left-0 top-0 w-full h-full z-5 bg-gradient-to-t from-black/20 to-black/0 rounded-xl">
            {" "}
          </div>
        </div>

        <h3 className="flex items-center text-center h-10 xl:h-7 xl:absolute z-10 left-6 bottom-6 font-medium text-sm xl:text-xl tracking-custom_2 text-title xl:text-white">
          {item.title}
        </h3>
      </Link>
    </div>
  );
};
