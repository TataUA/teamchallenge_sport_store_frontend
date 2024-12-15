"use client";

import { apiBaseUrl } from "@/services/api";
import { IProduct } from "@/services/types";
import { revalidateTag } from "next/cache";
import createShoppingCartAction from "./createShoppingCartInDbAction";

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

      return null;
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

    if (result.status === 201) {
      revalidateTag("products");

      return data;
    }

    if (
      data.detail
        .toLowerCase()
        .includes("no basketitem matches the given query")
    ) {
      const basketId = await createShoppingCartAction();
      if (!basketId) {
        return null;
      }

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

      if (result.status === 201) {
        return data;
      }
    }

    return null;
  } catch (error: any) {
    console.log("🚀 ~ fetchProductsAction ~ error:", error.response);

    return null;
  }
};

export default updateQuantityProductInCartInDbAction;
