"use client";

import { apiBaseUrl } from "@/services/api";
import { IProduct } from "@/services/types";
import { revalidateTag } from "next/cache";

const updateQuantityProductInCartInDbAction = async (
  basketId: string,
  product: IProduct,
  itemIdInBasket?: number,
) => {
  try {
    if (!itemIdInBasket) {
      console.log(
        "updateQuantityProductInCartInDbAction:itemIdInBasket parameter should be provided",
      );

      return false;
    }

    const preparedBody = {
      product: product.id,
      quantity: Number(product.quantity[0].quantity),
      size: Number(product.size[0].id),
      color: Number(product.colors[0].color.id),
    };

    const result = await fetch(
      `${apiBaseUrl}baskets/${basketId}/items/${itemIdInBasket}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 300 },
        body: JSON.stringify(preparedBody),
      },
    );

    const data = await result?.json();

    if (result.status !== 200) {
      throw new Error(JSON.stringify(data));
    }

    return true;
  } catch (error: any) {
    console.log(
      "🚀 ~ updateQuantityProductInCartInDbAction ~ error:",
      error.response,
    );

    return false;
  }
};

export default updateQuantityProductInCartInDbAction;
