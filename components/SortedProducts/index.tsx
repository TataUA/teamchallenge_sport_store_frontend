import Link from "next/link";

import fetchSortedProductsAction from "@/app/actions/fetchSortedProductsAction";
import { SliderWrapper } from "@/components/SortedProducts/SliderWrapper/SliderWrapper";

interface SortedProductsProps {
  title: string;
  page: string;
  sort: string;
}

export const SortedProducts = async ({
  title,
  page,
  sort,
}: SortedProductsProps) => {
  const products = await fetchSortedProductsAction(sort, 6);

  return (
    <section className="container xl:py-[52px]">
      <div className="flex items-center justify-between mb-4 xl:mb-8 text-title">
        <h2 className="font-semibold text-xl xl:text-2xl">{title}</h2>
        <Link
          href={`/sortedProducts${page}?limit=12`}
          className="flex items-center gap-1 text-sm xl:text-base text-[#083DC5]"
        >
          <p className="tracking-custom_4 xl:tracking-normal">Подивитись всі</p>
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
      <SliderWrapper products={products} />
    </section>
  );
};
