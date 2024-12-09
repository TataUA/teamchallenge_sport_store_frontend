import { IProduct } from "@/services/types";

export const getArrayWithExtractedImgUrl = (product?: IProduct | null) =>
  product?.colors?.map((item) => ({
    image: item.image_url,
  }));

export const getArrayWithExtractedImgUrlWithCurrentColor = (
  product: IProduct,
  currentColor: string,
) =>
  product?.colors
    ?.filter(
      (item) => item.color.title.toLowerCase() === currentColor.toLowerCase(),
    )
    ?.map((item) => ({ image: item.image_url, title: item.title }));
