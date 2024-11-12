import createShoppingCartAction from "@/app/actions/createShoppingCartInDbAction";
import getBasketIdFromLocalStorage, {
  setBasketIdToLocalStorage,
} from "./getBasketIdFromLocalStorage";
import { createOrder, IOrder } from "@/services/api";
import addProductToCartInDbAction from "@/app/actions/addProductToCartInDbAction";
import { IProduct } from "@/services/types";
import { setModalProductIsOutOfStock } from "@/redux/cart/cartSlice";
import { useDispatch } from "react-redux";

const createOrderHelper = async (
  data: any,
  successfulyRedirect: (data: any) => void,
  showModalProductOutOfStock: () => void,
): Promise<any> => {
  const { userData, orderState, deliveryAddress, cart } = data;

  const getOrCreateBasketId = async (): Promise<string> => {
    let basketId = getBasketIdFromLocalStorage();
    if (!basketId) {
      const newBasket = await createShoppingCartAction();
      basketId = newBasket.basketId;
      setBasketIdToLocalStorage(basketId);
    }
    return basketId;
  };

  const createNewOrder = (basketId: string): IOrder => {
    const fullAddressParts = orderState.city.split(",");
    return {
      basket_id: basketId,
      first_name: userData?.name,
      last_name: userData.patronymic,
      email: userData.email,
      surname: userData.surname,
      phone_number: userData.phone,
      delivery_method: orderState.deliveryType || "",
      branch: orderState.department || "",
      city: fullAddressParts[0] + "," + fullAddressParts[1] || "",
      appartment: deliveryAddress.numberAppartment,
      street: deliveryAddress.street,
      user: userData?.id || 0,
      payment_method: orderState.payment || "Upon Receipt",
    };
  };

  const addProductsToCart = async (
    basketId: string,
    products: IProduct[],
  ): Promise<void> => {
    await Promise.all(
      products.map(async (product) => {
        const response = await addProductToCartInDbAction(basketId, product);

        if (!response?.id) {
          console.log(
            `Product with id ${product.title}, was not saved, as it is out of Stock`,
          );
          showModalProductOutOfStock();
        }
      }),
    );
  };

  try {
    let basketId = await getOrCreateBasketId();
    let newOrder = createNewOrder(basketId);
    let response = await createOrder(newOrder);

    if (
      response?.data.msg?.includes("Basket does not exist") ||
      response?.data.msg?.includes("You cannot place an order from someone")
    ) {
      localStorage.removeItem("basketId");
      const newBasket = await createShoppingCartAction();
      basketId = newBasket.basketId;
      setBasketIdToLocalStorage(basketId);
      newOrder.basket_id = basketId;

      await addProductsToCart(basketId, cart.products);

      response = await createOrder(newOrder);
    } else if (response?.data.msg?.includes("Your basket is empty")) {
      await addProductsToCart(basketId, cart.products);

      response = await createOrder(newOrder);
    }

    if (
      response?.data.msg?.includes("Congratulations") ||
      response?.data.msg?.includes("created successfully")
    ) {
      return successfulyRedirect(response.data);
    }

    throw new Error("Unexpected response from server");
  } catch (error) {
    console.error("Error in createOrderHelper:", error);
    throw error;
  }
};

export default createOrderHelper;
