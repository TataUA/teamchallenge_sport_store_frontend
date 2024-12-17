import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { cn } from "@/services/utils/cn";
import { IProduct } from "@/services/types";
import getArrayRemovedColorsDuplicates from "@/helpers/getArrayRemovedDuplicates";

interface ListItemProps {
  product: IProduct;
  bestSales?: boolean;
}

const ListItem = (props: ListItemProps) => {
  const { product, bestSales = false } = props;
  const { title, colors, price } = product;

  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams);
  const filterByColor = params.getAll("color");

  let srcUrlImageString = product.colors[0].image_url;

  const srcUrlImage = product.colors.filter((item) => {
    if (filterByColor) {
      if (item.color.title.toLocaleLowerCase() == filterByColor[0]) {
        return item.image_url;
      }
    }
  });

  if (srcUrlImage[0]?.image_url) {
    srcUrlImageString = srcUrlImage[0].image_url;
  }

  return (
    <div
      className={cn(
        "pb-4",
        bestSales
          ? "w-[167px] xl:w-[200px] "
          : "min-[320px]:[width:calc((100%-8px)/2)] min-[480px]:[width:calc((100%-16px)/3)] min-[1024px]:[width:calc((100%-24px)/4)] min-[1440px]:[width:calc((100%-60px)/4)]",
      )}
    >
      <Link
        href={`/product/${product.id}`}
        className="flex flex-col gap-2 rounded-xl overflow-hidden cursor-pointer"
      >
        {bestSales ? (
          <Image
            alt={product.title}
            src={product.colors[0].image_url}
            width={200}
            height={302}
            className="mb-2 rounded-xl object-contain"
          />
        ) : (
          <Image
            alt={product.title}
            src={srcUrlImageString}
            width={167}
            height={252}
            className="w-[320px] object-contain rounded-xl"
          />
        )}
        <p
          className={cn(
            "line-clamp-2 h-10 hover:opacity-[50%] font-medium text-sm tracking-custom_4",
            bestSales ? "text-common" : "text-secondary",
          )}
        >
          {title}
        </p>
        <ul className="flex gap-2">
          {getArrayRemovedColorsDuplicates(colors)?.map(
            (item: { title: string; id: number }) => (
              <li
                key={item.id}
                className={cn(
                  `bg-${item.title.toLowerCase()} relative min-w-2 min-h-2 rounded-[50%]`,
                  {
                    border: item.title.toLowerCase() == "white",
                  },
                )}
              />
            ),
          )}
        </ul>
        <p className="font-semibold text-base text-title tracking-custom_2">
          {price.slice(0, -3) + " грн"}
        </p>
      </Link>
    </div>
  );
};

export default ListItem;
