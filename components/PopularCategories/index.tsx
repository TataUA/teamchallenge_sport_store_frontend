import { popularCategories } from "./popular-categories.data";
import { Slider } from "../Slider-hero/Slider";

export default function PopularCategories() {
  return (
    <div className="mb-12 px-6">
      <h2 className="text-xl leading-140 font-semibold  mb-4 md:text-2xl md:leading-7 md:mb-8">
        Популярні категорії
      </h2>
      <ul className="w-[calc(100%+24px)]  ">
        <Slider
          data={popularCategories}
          autoPlay={false}
          popularCat
          slidesPerView={3.2}
        />
      </ul>
    </div>
  );
}
