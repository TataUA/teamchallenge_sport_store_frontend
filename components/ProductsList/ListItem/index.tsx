import Link from "next/link";

// utils
import { cn } from "@/services/utils/cn";
import getArrayWithExtractedImgUrl from "@/helpers/getArrayWithExtractedImgUrl";
import getArrayRemovedColorsDuplicates from "@/helpers/getArrayRemovedDuplicates";

// components
import { Slider } from "@/components/Slider-hero/Slider";

// types
import { IProduct } from "@/services/types";

interface ListItemProps {
  product: IProduct;
  bestSales?: boolean;
}

const ListItem = (props: ListItemProps) => {
  const { product, bestSales = false } = props;
  const { title, colors, price } = product;

  return (
    <div
      className={cn(
        "flex flex-col gap-2 pb-5",
        bestSales
          ? "w-[167px]"
          : "w-[32.33333%] max-[767px]:w-[48.5%] max-[767px]:pb-4 max-[370px]:w-[100%] min-[1250px]:w-[24%] min-[2800px]:gap-6",
      )}
    >
      <Link
        href={`/product/${product.id}`}
        className="rounded-[12px] overflow-hidden cursor-pointer"
      >
        <Slider
          productsList
          autoPlay={false}
          cardImage
          bestSalesItem={bestSales}
          data={getArrayWithExtractedImgUrl(product) || []}
        />
      </Link>
      <Link
        href={`/product/${product.id}`}
        className={cn(
          bestSales ? "text-[#3E3E40]" : "text-[#575758]",
          " truncate cursor-pointer hover:opacity-[50%] text-base max-[767px]:text-sm font-medium min-[2800px]:text-3xl",
        )}
      >
        {title}
      </Link>
      <ul className="flex gap-2 min-[2800px]:gap-5">
        {getArrayRemovedColorsDuplicates(colors)?.map(
          (item: { title: string; id: number }) => (
            <li
              key={item.id}
              className={cn(
                `bg-${item.title.toLowerCase()} relative min-w-3 min-h-3 rounded-[50%] min-[2800px]:size-8`,
                {
                  border: true,
                },
              )}
            />
          ),
        )}
      </ul>
      <div className="text-[#1A1A1C] truncate text-xl max-[767px]:text-base font-semibold min-[2800px]:text-4xl">
        {price + " грн"}
      </div>
    </div>
  );
};

export default ListItem;
