'use client';

import { apiBaseUrl } from "@/services/api";

const removeProductToCartInDbAction = async (basketId: string, itemIdInBasket: number) => {
  try {

    await fetch(`${apiBaseUrl}baskets/${basketId}/items/${itemIdInBasket}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

  } catch (error: any) {
    console.log("🚀 ~ fetchProductsAction ~ error:", error.response)
  }
}

export default removeProductToCartInDbAction
