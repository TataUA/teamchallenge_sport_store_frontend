'use client';

import { apiBaseUrl } from "@/services/api";

const fetchProductByIdClientAction = async (id: number | string, color: number, size: number) => {
  try {
    const result = await fetch(`${apiBaseUrl}products/${id}/?color=${color}&size=${size}`, { next: { revalidate: 3600 } });
    
    if(result.status === 200) {
      const data = result?.json()
      return data;
    }

    return {};

  } catch (error: any) {
    console.log("🚀 ~ fetchProductsAction ~ error:", error.response)
  }
}

export default fetchProductByIdClientAction
