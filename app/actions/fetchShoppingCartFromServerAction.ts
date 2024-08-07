'use client';

import { apiBaseUrl } from "@/services/api";

export interface ICartResponseItem {
  id: number
  quantity: number
  product: number
  color: number
  size: number
  created_at: string
  updated_at: number
  basket: number
}

const fetchShoppingCartFromServerAction = async (id: string) => {
  try {
    const result = await fetch(`${apiBaseUrl}baskets/${id}/`, { next: { revalidate: 3600 } });
    
    if(result.status === 200) {
      const data: {id:string, items: ICartResponseItem[]} = await result?.json()
      return data;
    }
    
    return null;
  } catch (error: any) {
    console.log("🚀 ~ fetchProductsAction ~ error:", error.response)
  }
}

export default fetchShoppingCartFromServerAction
