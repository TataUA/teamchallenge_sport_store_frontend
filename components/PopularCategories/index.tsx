import Image from "next/image";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

import { popularCategories } from "@/public/data/popular-categories.data";

export const PopularCategories = () => {
  return (
    <section className="container pb-12 xl:py-[52px]">
      <h2 className="mb-4 xl:mb-8 font-semibold text-xl xl:text-2xl text-title">
        Популярні категорії
      </h2>
      <ul className="flex flex-wrap gap-2 xl:gap-6">
        {popularCategories.map(({ href, image, title }) => (
          <li
            key={uuidv4()}
            className="relative w-[calc((100%-8px)/2)] xl:w-[312px] "
          >
            <Link
              href={href ?? "/"}
              className="flex flex-col gap-2 w-full h-full cursor-pointer"
            >
              <div className="flex flex-col items-center justify-center w-full min-h-[108px] xl:min-h-[181px] max-h-[181px] rounded-xl overflow-hidden">
                <Image
                  src={image || ""}
                  alt={title}
                  width={312}
                  height={181}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="flex items-center text-center h-10 xl:h-7 xl:absolute z-10 left-6 bottom-6 font-medium text-sm xl:text-xl tracking-custom_2 text-title xl:text-white">
                {title}
              </h3>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
