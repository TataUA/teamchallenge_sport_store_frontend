import Link from "next/link";
import { Slider } from "../Slider-hero/Slider";

import fetchSortedProductsAction from "@/app/actions/fetchSortedProductsAction";

interface SortedProductsProps {
  title: string;
  page: string;
  sort: string;
}

export default async function SortedProducts({
  title,
  page,
  sort,
}: SortedProductsProps) {
  const products = await fetchSortedProductsAction(sort, 6);

  return (
    <section className=" font-pangram px-6 xl:container xl:mx-auto xl:px-[60px] xl:pt-[46px] xl:pb-[52px]">
      <div className="flex justify-between  items-center mb-4 md:mb-8 xl:mb-8">
        <h2 className="text-xl leading-140 font-semibold  md:text-2xl md:leading-7 ">
          {title}
        </h2>
        <Link
          href={`/sortedProducts${page}?limit=12`}
          className=" flex gap-1 items-center text-sm text-[#083DC5] xl:text-base"
        >
          <p className="tracking-wider xl:tracking-normal xl:mr-1">
            Подивитись всі
          </p>
          <svg
            width="18px"
            height="18px"
            viewBox="0 0 24 24"
            stroke="#083DC5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="svgIcon xl:w-6 xl:h-6"
          >
            <path
              d="M9 18L15 12L9 6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
      <ul className="w-[calc(100%+24px)]  ">
        <Slider
          products={products}
          autoPlay={false}
          bestSales
          slidesPerView={2.1}
          slidesPerViewDesktop={6}
        />
      </ul>
    </section>
  );
}
