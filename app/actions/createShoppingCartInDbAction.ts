'use client';

import { $instance} from "@/services/api";
import fetchShoppingCartFromServerAction from "./fetchShoppingCartFromServerAction";

const createShoppingCartAction = async () => {
  try {
    const basketId = localStorage.getItem('basketId');

    if (basketId) {
      const data = await fetchShoppingCartFromServerAction(basketId);

      !data && localStorage.removeItem("basketId");

      if(data) {
        return basketId;
      };
    }

    const result = await $instance.post('baskets/', {}, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if(result.status === 201) {
      const { data }: {data: {basket_id:string, user_id: number[]}} = result;

      localStorage.setItem("basketId", data.basket_id);

      return data.basket_id;
    }

    return null;
    
  } catch (error: any) {
    console.log("🚀 ~ fetchProductsAction ~ error:", error.response)

    return null
  }
}

export default createShoppingCartAction
