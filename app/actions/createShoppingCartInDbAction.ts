'use client';

import { $instance} from "@/services/api";

const createShoppingCartAction = async () => {
  try {
    const result = await $instance.post('baskets/', {}, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if(result.status === 201) {
      const { data }: {data: {basket_id:string, user_id: number[]}} = result;
      return {
        basketId: data.basket_id,
        userId: data.user_id
      };
    }

    return {basketId: '', userId: 0};
    
  } catch (error: any) {
    console.log("🚀 ~ fetchProductsAction ~ error:", error.response)

    return {basketId: '', userId: 0}
  }
}

export default createShoppingCartAction
