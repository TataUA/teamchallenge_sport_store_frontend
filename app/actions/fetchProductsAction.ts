'use server';

import { $instance } from "@/services/api";
import { cookies } from "next/headers";

const fetchProductsAction = async () => {
  try {
    const result = await fetch("https://api.sporthubsstore.com/products/");
    if(result.status === 200) {
      const data = result?.json()
      return data;
    }
    return [];
  } catch (error: any) {
    console.log("🚀 ~ fetchProductsAction ~ error:", error.response)
  }
}

export default fetchProductsAction
