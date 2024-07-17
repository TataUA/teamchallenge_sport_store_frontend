'use server';

import { $instance } from "@/services/api";

const fetchProductByIdAction = async (id: number | string) => {
  try {
    const { data } = await $instance.get(`/products/${id}/`);
    return data;
  } catch (error: any) {
    console.log("🚀 ~ fetchProductsAction ~ error:", error.response)
  }
}

export default fetchProductByIdAction
