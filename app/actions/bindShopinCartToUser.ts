"use client";

import { setBasketIdToLocalStorage } from "@/helpers/getBasketIdFromLocalStorage";
import { $instance } from "@/services/api";

const bindShopingCartToUser = async (basketId: string) => {
  try {
    const result = await $instance.post(
      "baskets/merge/",
      { basket_id: basketId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (result.status !== 200) {
      throw new Error(JSON.stringify(result.data));
    }

    const { data }: { data: { basket_id: string; user_id: number[] } } = result;
    
    setBasketIdToLocalStorage(data.basket_id);

    return data.basket_id;
  } catch (error: any) {
    console.log("🚀 ~ bindShopingCartToUser ~ error:", error.response);

    return null;
  }
};

export default bindShopingCartToUser;
