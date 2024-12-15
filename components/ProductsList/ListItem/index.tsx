import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { cn } from "@/services/utils/cn";
import getArrayRemovedColorsDuplicates from "@/helpers/getArrayRemovedDuplicates";

import { IProduct } from "@/services/types";

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
        "flex flex-col gap-2 pb-5",
        bestSales
          ? "w-[167px] xl:w-[200px] "
          : "w-[32.33333%] max-[767px]:w-[48.5%] max-[767px]:pb-4 max-[370px]:w-[100%] min-[1250px]:w-[24%] min-[2800px]:gap-6",
      )}
    >
      <Link
        href={`/product/${product.id}`}
        className="rounded-[12px] overflow-hidden cursor-pointer"
      >
        {bestSales ? (
          <Image
            alt=""
            src={product.colors[0].image_url}
            width={167}
            height={252}
            className="w-[200px] object-contain "
          />
        ) : (
          <Image
            alt=""
            src={srcUrlImageString}
            width={167}
            height={252}
            className="w-[200px] object-contain xl:w-[306px]"
          />
        )}
      </Link>
      <Link
        href={`/product/${product.id}`}
        className={cn(
          bestSales
            ? "text-[#3E3E40] xl:text-sm xl:tracking-wider"
            : "text-[#575758]",
          "line-clamp-2 h-10 cursor-pointer hover:opacity-[50%] text-base max-[767px]:text-sm font-medium min-[2800px]:text-3xl",
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
                `bg-${item.title.toLowerCase()} relative min-w-2 min-h-2 rounded-[50%] min-[2800px]:size-8 `,
                {
                  border: item.title.toLowerCase() == "white",
                },
              )}
            />
          ),
        )}
      </ul>
      <div className="text-[#1A1A1C] truncate text-xl max-[767px]:text-base font-semibold min-[2800px]:text-4xl xl:text-base xl:mt-1.5 ">
        {price.slice(0, -3) + " грн"}
      </div>
    </div>
  );
};

export default ListItem;
