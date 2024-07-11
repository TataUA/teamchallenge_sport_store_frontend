'use server';

import { $instance } from "@/services/api";
import { cookies } from "next/headers";

const fetchProductsAction = async () => {
  try {
    const { data } = await $instance.get("/products/");
    return data;
  } catch (error: any) {
    console.log("🚀 ~ fetchProductsAction ~ error:", error.response)
  }
}

export default fetchProductsAction
