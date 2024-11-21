'use server';

import { apiBaseUrl } from "@/services/api";

const fetchProductsAction = async (subCategory: string) => {
  try {
    const result = await fetch(
      `${apiBaseUrl}products/search/?category=${subCategory}`,
      { cache: "no-store" },
    );
    if(result.status === 200) {
      const data = await result?.json()
      return data;
    }
    return [];
  } catch (error: any) {
    console.log("🚀 ~ fetchProductsAction ~ error:", error.response)
  }
}

export default fetchProductsAction
