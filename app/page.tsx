import { Slider } from "./components/Slider";

//Замінити та видалити!
import dataSlider from "../public/data/slider_data.json";

export default function Home() {
  return (
    <main>
      <Slider data={dataSlider} />
    </main>
  );
}
