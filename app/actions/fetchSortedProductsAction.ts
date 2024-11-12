"use server";

import { apiBaseUrl } from "@/services/api";

const fetchSortedProductsAction = async (sort: string, limit: number) => {
  try {
    const result = await fetch(
      `${apiBaseUrl}products/sort/?sort=${sort}&limit=${limit}`,
      { next: { revalidate: 300, tags: ["productsSorted"] } },
    );
    if (result.status === 200) {
      const data = await result?.json();
      return data.results;
    }
    return [];
  } catch (error: any) {
    console.log("🚀 ~ fetchProductsAction ~ error:", error.response);
  }
};

export default fetchSortedProductsAction;

