'use server';

import { $instance } from "@/services/api";
import { cookies } from "next/headers";

const fetchProductsAction = async () => {
  const token = cookies().get('api_token');

  try {
    $instance.defaults.headers["Authorization"] = `Bearer ${token?.value}`;
    
    const { data } = await $instance.get("/products/");
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
}

export default fetchProductsAction
