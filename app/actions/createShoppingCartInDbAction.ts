"use client";

import { $instance } from "@/services/api";
import { setBasketIdToLocalStorage } from "@/helpers/getBasketIdFromLocalStorage";

const createShoppingCartAction = async () => {
  try {
    const result = await $instance.post(
      "baskets/",
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (result.status !== 201) {
      throw new Error(JSON.stringify(result.data));
    }

    const { data }: { data: { basket_id: string; user_id: number[] } } = result;

    setBasketIdToLocalStorage(data.basket_id);

    return data.basket_id;
  } catch (error: any) {
    console.log("🚀 ~ fetchProductsAction ~ error:", error.response);

    return null;
  }
};

export default createShoppingCartAction;
