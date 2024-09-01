import fetchProductsByPopularAction from "./actions/fetchProductsByPopularAction";
import fetchProductsByNewAction from "./actions/fetchProductsByNewAction";
import { Slider } from "@/components/Slider-hero/Slider";

//Замінити та видалити!
import dataSlider from "../public/data/slider_data.json";
import SubscribeBannerFooter from "@/components/SubscribeBannerFooter";
import AboutUs from "@/components/AboutUs";
import PopularCategories from "@/components/PopularCategories";
import SortedProducts from "@/components/SortedProducts";
import PromBanner from "@/components/PromBanner";

export default async function Page() {
  return (
    <>
      {/* <Slider
        data={dataSlider}
        homePageMainSlider
        className={"min-h-[400px] h-[50dvh]"}
			/> */}
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
