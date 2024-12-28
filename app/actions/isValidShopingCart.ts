"use client";

import fetchShoppingCartFromServerAction from "./fetchShoppingCartFromServerAction";

const isValidShopingCart = async (basketId: string) => {
  try {
    const data = await fetchShoppingCartFromServerAction(basketId);

    !data && localStorage.removeItem("basketId");

    if (data) {
      return data;
    }

    return null;
  } catch (error: any) {
    console.log("🚀 ~ isValidShopingCart ~ error:", error.response);

    return null;
  }
};

export default isValidShopingCart;
