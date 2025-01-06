"use server";

import { apiBaseUrl } from "@/services/api";

const fetchProductsByGenderAction = async (
  gender: string,
  limit: number,
  offset: number,
) => {
  try {
    const result = await fetch(
      `${apiBaseUrl}products/search/?gender=${gender}&limit=${limit}&offset=${offset}`,
      { cache: "no-store" },
    );

    if (result.status === 200) {
      const data = await result?.json();

      return [data.results, data.count];
    }
    return [];
  } catch (error: any) {
    console.log("🚀 ~ fetchProductsAction ~ error:", error.response);
  }
};

export default fetchProductsByGenderAction;
