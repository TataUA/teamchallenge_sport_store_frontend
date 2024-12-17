import { popularCategories } from "@/public/data/popular-categories.data";
import { Slider } from "@/components/Slider/Slider";

export default function PopularCategories() {
  return (
    <section className="container pb-12 xl:px-[60px] xl:py-[52px] ">
      <h2 className="text-xl text-title leading-140 font-semibold  mb-4 md:text-2xl md:leading-7 md:mb-8 xl:pt-1">
        Популярні категорії
      </h2>
      <ul className="w-[calc(100%+25px)]">
        <Slider
          data={popularCategories}
          autoPlay={false}
          popularCat
          slidesPerView={3.2}
          //slidesPerViewDesktop={4}
          loop={false}
        />
      </ul>
    </section>
  );
}
