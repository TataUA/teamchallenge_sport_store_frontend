'use server';

import { apiBaseUrl } from "@/services/api";
import { revalidateTag } from "next/cache";

const fetchProductByIdAction = async (id: number | string) => {
  try {
    const result = await fetch(`${apiBaseUrl}products/${id}/`, { next: { revalidate: 3600, tags: ['productById'] }  });
    
    if(result.status === 200) {
      const data = result?.json()
      return data;
    }

    revalidateTag('productById')
    
    return [];

  } catch (error: any) {
    console.log("🚀 ~ fetchProductsAction ~ error:", error.response)
  }
}

export default fetchProductByIdAction
