import { Slider } from "@/components/Slider/Slider";
import { Gender } from "@/components/Gender";
import { PopularCategories } from "@/components/PopularCategories";
import { SortedProducts } from "@/components/SortedProducts";
import { PromBanner } from "@/components/PromBanner";
import { AboutUs } from "@/components/AboutUs";
import dataSlider from "@/public/data/slider_data.json";

export default async function Page() {
  return (
    <>
      <Slider data={dataSlider} homePageMainSlider loop={false} />
      <Gender />
      <PopularCategories />
      <SortedProducts title="Топ продажів" page="/popular" sort="popular" />
      <PromBanner />
      <SortedProducts title="Новинки" page="/created_at" sort="created_at" />
      <AboutUs />
    </>
  );
}
