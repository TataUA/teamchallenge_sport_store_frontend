import { Slider } from "../Slider-hero/Slider";

interface SortedProductsProps {
  title: string;
  fetchProducts: () => Promise<any[]>;
}

export default async function SortedProducts({
  title,
  fetchProducts,
}: SortedProductsProps) {
  const products = await fetchProducts();

  return (
    <div className="mb-12 px-6">
      <h2 className="text-xl leading-140 font-semibold  mb-4 md:text-2xl md:leading-7 md:mb-8">
        {title}
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
