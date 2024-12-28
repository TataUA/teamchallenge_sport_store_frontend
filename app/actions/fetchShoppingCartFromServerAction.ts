"use client";

import { apiBaseUrl } from "@/services/api";
import createShoppingCartAction from "./createShoppingCartInDbAction";

export interface ICartResponseItem {
  id: number;
  quantity: number;
  product: number;
  color: number;
  size: number;
  created_at: string;
  updated_at: number;
  basket: number;
  detail?: string;
}

export interface ICartResponse {
  id: string;
  items: ICartResponseItem[];
  user: number;
}

const fetchShoppingCartFromServerAction = async (id: string) => {
  try {
    const result = await fetch(`${apiBaseUrl}baskets/${id}/`, {
      cache: "no-store",
    });

    if (result.status === 200) {
      const data: ICartResponse = await result?.json();

      return data;
    }

    if (result.status === 404) {
      const data: { detail: string } = await result?.json();

      if (
        data.detail.toLowerCase().includes("no basket matches the given query")
      ) {
        const basketId = await createShoppingCartAction();

        if (basketId) {
          const result = await fetch(`${apiBaseUrl}baskets/${basketId}/`, {
            cache: "no-store",
          });

          if (result.status === 200) {
            const data: ICartResponse = await result?.json();

            return data;
          }
        }

        return null;
      }
    }

    return null;
  } catch (error: any) {
    console.log("🚀 ~ fetchProductsAction ~ error:", error.response);

    return null;
  }
};

export default fetchShoppingCartFromServerAction;
