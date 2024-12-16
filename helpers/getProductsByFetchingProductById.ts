import fetchProductByIdClientAction from "@/app/actions/fetchProductByIdClientAction";
import { ICartResponseItem } from "@/app/actions/fetchShoppingCartFromServerAction";
import { IProduct } from "@/services/types";

const getProductsByFetchingProductById = async (items: ICartResponseItem[]) => {
  const result = await Promise.all(
    items.map(async (item) => {
      const productData: IProduct = await fetchProductByIdClientAction(
        item.product,
        item.color,
        item.size,
      );

      const colors = productData.colors.filter(
        (colorItem) => colorItem.color.id === item.color,
      );

      const size = productData.size.filter(
        (sizeItem) => sizeItem.id === item.size,
      );

      const filteredQuantities = [...productData.quantity].filter(
        (q) =>
          q.size === size[0]?.value &&
          q.color.toLowerCase() === colors[0]?.color.title.toLowerCase(),
      );

      return {
        ...productData,
        colors,
        size,
        quantity: [
          {
            size: size[0]?.value,
            color: colors[0]?.color.title,
            quantity: item.quantity,
          },
        ],
        maxQuantity: filteredQuantities[0]?.quantity || 0,
        idInBasketInDb: item.id,
      };
    }),
  );

  return result;
};

export default getProductsByFetchingProductById;
