import { popularCategories } from "./popular-categories.data";
import { Slider } from "../Slider-hero/Slider";

export default function PopularCategories() {
  return (
    <div className="mb-12 px-6">
      <h2 className="text-xl leading-140 font-semibold  mb-4 md:text-2xl md:leading-7 md:mb-8">
        Популярні категорії
      </h2>
      <div className="relative h-[156px] ">
        <div className="absolute left-0 right-0 w-[calc(100%+24px)] h-[156px] flex  ">
          <Slider
            data={popularCategories}
            autoPlay={false}
            popularCat
            slidesPerView={3.2}
          />
        </div>
      </div>
    </div>
  );
}
