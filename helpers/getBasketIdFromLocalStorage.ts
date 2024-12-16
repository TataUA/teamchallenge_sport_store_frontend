export const getBasketIdFromLocalStorage = () => {
  try {
    const basketId = localStorage.getItem("basketId");

    if (basketId) {
      const id = JSON.parse(basketId);

      return id;
    }

    return null;
  } catch (error) {
    console.log("🚀 ~ getBasketIdFromLocalStorage ~ error:", error);

    return null;
  }
};

export const setBasketIdToLocalStorage = (basketId: string) => {
  return localStorage.setItem("basketId", JSON.stringify(basketId));
};

export default getBasketIdFromLocalStorage;
