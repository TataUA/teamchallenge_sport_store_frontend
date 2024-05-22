import { Slider } from "./components/slider-hero/Slider";

//Замінити та видалити!
import dataSlider from "../public/data/slider_data.json";

export default function Page() {
  return (
    <>
      <Slider data={dataSlider} />
    </>
  );
}
