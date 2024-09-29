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
    const result = await fetch(`${apiBaseUrl}baskets/${id}/`, { next: { revalidate: 3600, tags: ['cart'] } });
    
    if(result.status === 200) {
      const data: {id:string, items: ICartResponseItem[]} = await result?.json()
      return {...data, reCreateBasket: false,};
    }
    
    if(result.status === 404) {
      const data: {detail: string} = await result?.json()
      
      if(data.detail.toLowerCase().includes("no basket matches the given query")) {
        return {reCreateBasket: true, id:'', items: []}
      }
    }
    
    return {reCreateBasket: false, id:'', items: []};
  } catch (error: any) {
    console.log("🚀 ~ fetchProductsAction ~ error:", error.response)
  }
}

export default fetchShoppingCartFromServerAction
