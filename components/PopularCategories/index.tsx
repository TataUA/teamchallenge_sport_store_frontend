import { popularCategories } from "./popular-categories.data";
import { Slider } from "../Slider/Slider";

export default function PopularCategories() {
  return (
    <section className="font-pangram pb-12 px-6 xl:container xl:mx-auto xl:px-[60px] xl:py-[52px] ">
      <h2 className="text-xl leading-140 font-semibold  mb-4 md:text-2xl md:leading-7 md:mb-8 xl:pt-1">
        Популярні категорії
      </h2>
      <ul className="w-[calc(100%+25px)]">
        <Slider
          data={popularCategories}
          autoPlay={false}
          popularCat
          slidesPerView={3.2}
          slidesPerViewDesktop={4}
          loop={false}
        />
      </ul>
    </section>
  );
}
