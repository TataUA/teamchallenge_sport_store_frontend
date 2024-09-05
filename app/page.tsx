import fetchProductsByPopularAction from "./actions/fetchProductsByPopularAction";
import fetchProductsByNewAction from "./actions/fetchProductsByNewAction";
import { Slider } from "@/components/Slider-hero/Slider";
import dataSlider from "../public/data/slider_data.json";

import PopularCategories from "@/components/PopularCategories";
import SortedProducts from "@/components/SortedProducts";
import PromBanner from "@/components/PromBanner";
import AboutUs from "@/components/AboutUs";
import SubscribeBannerFooter from "@/components/SubscribeBannerFooter";
import Gender from "@/components/Gender";

export default async function Page() {
  return (
    <>
      <Slider
        data={dataSlider}
        homePageMainSlider
        className={"min-h-[400px] h-[50dvh] mb-12"}
      />
      <Gender/>
      <PopularCategories />
      <SortedProducts
        title="Новинки"
        fetchProducts={fetchProductsByNewAction}
      />
      <PromBanner />
      <SortedProducts
        title="Топ продажів"
        fetchProducts={fetchProductsByPopularAction}
      />
      <AboutUs />
      <SubscribeBannerFooter />
    </>
  );
}
