"use server";

import { apiBaseUrl } from "@/services/api";

const fetchProductsByNewAction = async () => {
  try {
    const result = await fetch(
      `${apiBaseUrl}products/sort/?sort=created_at&limit=12`,
      { next: { revalidate: 3600 } },
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

export default fetchProductsByNewAction;
