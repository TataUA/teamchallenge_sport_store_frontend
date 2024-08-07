'use server';

import { apiBaseUrl } from "@/services/api";

const fetchProductByIdAction = async (id: number | string) => {
  try {
    const result = await fetch(`${apiBaseUrl}products/${id}/`, { next: { revalidate: 3600 } });
    if(result.status === 200) {
      const data = result?.json()
      return data;
    }
    return [];

  } catch (error: any) {
    console.log("🚀 ~ fetchProductsAction ~ error:", error.response)
  }
}

export default fetchProductByIdAction
