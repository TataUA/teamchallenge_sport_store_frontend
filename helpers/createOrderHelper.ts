// helpers
import getBasketIdFromLocalStorage, {
  setBasketIdToLocalStorage,
} from "./getBasketIdFromLocalStorage";

// service
import { createOrder, IOrder } from "@/services/api";

// actions
import createShoppingCartAction from "@/app/actions/createShoppingCartInDbAction";
import addProductToCartInDbAction from "@/app/actions/addProductToCartInDbAction";

// types
import { ICartState, IProductWithMaxQuantity } from "@/redux/cart/cartSlice";

const createOrderHelper = async (
  data: {
    userData: any;
    orderState: any;
    deliveryAddress: any;
    cart: ICartState;
  },
  successfulyRedirect: (data: any) => void,
  showModalProductOutOfStock: (product: IProductWithMaxQuantity) => void,
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
    products: IProductWithMaxQuantity[],
  ): Promise<void> => {
    await Promise.all(
      products.map(async (product) => {
        const response = await addProductToCartInDbAction(basketId, product);

        if (!response?.id) {
          console.log(
            `Product with id ${product.title}, was not saved, as it is out of Stock`,
          );
          showModalProductOutOfStock(product);
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
