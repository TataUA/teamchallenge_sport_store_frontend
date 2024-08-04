'use client';

import { IProductWithMaxQuantity } from "@/redux/cart/cartSlice";
import { apiBaseUrl } from "@/services/api";

const createShoppingCartAction = async () => {
  try {
    const result = await fetch(`${apiBaseUrl}baskets/`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      next: { revalidate: 3600 }
    });

    if(result.status === 201) {
      const data: {id:string, items: IProductWithMaxQuantity[]} = await result?.json()
      return data;
    }

    return {id: '', items: []};
    
  } catch (error: any) {
    console.log("🚀 ~ fetchProductsAction ~ error:", error.response)
    return {id: '', items: []};
  }
}

export default createShoppingCartAction
