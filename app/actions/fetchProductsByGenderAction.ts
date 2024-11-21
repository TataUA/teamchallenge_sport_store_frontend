"use server";

import { apiBaseUrl } from "@/services/api";

const fetchProductsByGenderAction = async (gender: string) => {
  try {
    const result = await fetch(
      `${apiBaseUrl}products/search/?gender=${gender}`,
      { cache: "no-store" },
    );
    if (result.status === 200) {
      const data = await result?.json();
      return data;
    }
    return [];
  } catch (error: any) {
    console.log("🚀 ~ fetchProductsAction ~ error:", error.response);
  }
};

export default fetchProductsByGenderAction;
