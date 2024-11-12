'use client';

import { apiBaseUrl } from "@/services/api";
import { IProduct } from "@/services/types";
import { ICartResponseItem } from "./fetchShoppingCartFromServerAction";

const addProductToCartInDbAction = async (basketId: string, product:IProduct) => {
  try {
    const preparedBody = {
      product: product.id,
      quantity: Number(product.quantity[0].quantity),
      size: Number(product.size[0].id),
      color: Number(product.colors[0].color.id),
    }

    const result = await fetch(`${apiBaseUrl}baskets/${basketId}/items/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 300 },
      body: JSON.stringify(preparedBody),
    });

    const data: ICartResponseItem = await result?.json()
    if(result.status === 201) {
      return data;
    }

    return {id: null, detail: data.detail};
  } catch (error: any) {
    console.log("🚀 ~ fetchProductsAction ~ error:", error.response)
    return {id: null, detail: error.response.data.detail};
  }
}

export default addProductToCartInDbAction
