import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

// types
import { IProduct } from "@/services/types";

// utils
import { cn } from "@/services/utils/cn";

interface IProps {
  product: IProduct;
  onClose?: () => void;
  classname?: string;
}

const ProductCardInfo = (props: IProps) => {
  const { product, onClose, classname } = props;

  const router = useRouter();

  const handleClickItem = () => {
    if (onClose) onClose();
  };

  return (
    <Link
      className={cn(
        "flex min-h-6 gap-3 mb-4 pb-4 hover:bg-gray-100 border-b-[1px] xl:border-[#E7E7E8]",
        `${classname ? classname : ""}`,
      )}
      onClick={() => handleClickItem()}
      href={`/product/${product.id}/`}
    >
      <div
        className={cn(
          "w-[50px] h-[72px]  bg-blue rounded-xl xl:rounded-lg overflow-hidden",
        )}
      >
        <Image
          width={52}
          height={72}
          src={product.colors?.[0]?.image_url}
          alt="photo_product"
        />
      </div>
      <div className="flex flex-col justify-evenly flex-1 xl:flex-none xl:w-[260px] ">
        <p className="text-ellipsis whitespace-nowrap overflow-hidden max-w-[75vw]">
          {product.title}
        </p>
        <p className="text-[#868687]">{product.category.sub_category}</p>
        <div className="flex justify-between">
          <span className="text-[#1A1A1C] font-semibold text-base">
            {product.price} грн
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCardInfo;
