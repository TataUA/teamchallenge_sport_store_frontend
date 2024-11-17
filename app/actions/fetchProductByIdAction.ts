"use server";

import { apiBaseUrl } from "@/services/api";

const fetchProductByIdAction = async (id: number | string) => {
  try {
    const result = await fetch(`${apiBaseUrl}products/${id}/`, {
      cache: "no-store",
    });

    if (result.status !== 200) {
      throw new Error("Error during fetchProductByIdAction " + id);
    }

    const data = await result?.json();
    return data;
  } catch (error: any) {
    console.log("🚀 ~ fetchProductsAction ~ error:", error.response);
    return null;
  }
};

export default fetchProductByIdAction;
