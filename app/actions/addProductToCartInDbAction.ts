'use client';

import { apiBaseUrl } from "@/services/api";
import { IProduct } from "@/services/types";

const addProductToCartInDbAction = async (basketId: string, product:IProduct) => {
  try {
    const preparedBody = {
      product: product.id,
      quantity: Number(product.quantity[0].quantity),
      size: Number(product.size[0].id),
      color: Number(product.colors[0].color.id),
    }

    const result = await fetch(`${apiBaseUrl}baskets/${basketId}/items/`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      next: { revalidate: 3600 },
      body: JSON.stringify(preparedBody)
    });
    if(result.status === 201) {
      const data = await result?.json()
      return data;
    }
    return [];
  } catch (error: any) {
    console.log("🚀 ~ fetchProductsAction ~ error:", error.response)
  }
}

export default addProductToCartInDbAction
