import { SliderWrapper } from "@/components/PopularCategories/SliderWrapper/SliderWrapper";
import { popularCategories } from "@/public/data/popular-categories.data";

export const PopularCategories = () => {
  return (
    <section className="container pb-12 xl:py-[52px]">
      <h2 className="mb-4 xl:mb-8 font-semibold text-xl xl:text-2xl text-title">
        Популярні категорії
      </h2>
      <SliderWrapper popular={popularCategories} />
    </section>
  );
};
