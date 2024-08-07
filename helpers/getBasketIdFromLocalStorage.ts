export const getBasketIdFromLocalStorage = () => {
  const idLocalStorage = localStorage.getItem("basketId");

  if (idLocalStorage) {
    const id = JSON.parse(idLocalStorage);

    return  id || "";
  }
  return "";
};

export const setBasketIdToLocalStorage = (basketId: string) => {
  return localStorage.setItem("basketId", JSON.stringify(basketId));
};

export default getBasketIdFromLocalStorage