import fetchProductsByPopularAction from "@/app/actions/fetchProductsByPopularAction";
import { Slider } from "../Slider-hero/Slider";

const getProducts = async () => {
  const data = await fetchProductsByPopularAction();
  console.log(data.results);

  return data.results;
};

export default async function BestSales() {
  const products = await getProducts();
  return (
    <div className="mb-12 px-6">
      <h2 className="text-xl leading-140 font-semibold  mb-4 md:text-2xl md:leading-7 md:mb-8">
        Топ продажів
      </h2>
      <ul className="w-[calc(100%+24px)]  ">
        <Slider
          products={products}
          autoPlay={false}
          bestSales
          slidesPerView={2.1}
        />
      </ul>
    </div>
  );
}
