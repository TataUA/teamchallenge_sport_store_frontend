import { Slider } from "@/components/Slider-hero/Slider";

//Замінити та видалити!
import dataSlider from "../public/data/slider_data.json";
import SubscribeBannerFooter from "@/components/SubscribeBannerFooter";
import AboutUs from "@/components/AboutUs";
import PopularCategories from "@/components/PopularCategories";
import BestSales from "@/components/BestSales";

export default async function Page() {
  return (
    <>
      {/* <Slider
        data={dataSlider}
        homePageMainSlider
        className={"min-h-[400px] h-[50dvh]"}
			/> */}
      <PopularCategories />
      <BestSales />
      <AboutUs />
      <SubscribeBannerFooter />
    </>
  );
}
