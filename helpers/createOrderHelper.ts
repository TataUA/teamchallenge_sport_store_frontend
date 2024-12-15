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
import { ICartState } from "@/redux/cart/cartSlice";
import { IProductWithMaxQuantity } from "@/services/types";

const createOrderHelper = async (
  data: {
    userData: any;
    orderState: any;
    deliveryAddress: any;
    cart: ICartState;
  },
  successfulyRedirect: (data: any) => void,
  showModalProductOutOfStock: (products: IProductWithMaxQuantity[]) => void,
): Promise<any> => {
  const { userData, orderState, deliveryAddress, cart } = data;

  const getOrCreateBasketId = async (): Promise<string> => {
    let basketId = getBasketIdFromLocalStorage();

    if (!basketId) {
      basketId = await createShoppingCartAction();

      if (!basketId) {
        return '';
      }

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
    const productsOutOfStock: IProductWithMaxQuantity[] = [];

    await Promise.all(
      products.map(async (product) => {
        const intemIdInBasket = await addProductToCartInDbAction(basketId, product);

        if (!intemIdInBasket) {
          console.log(
            `Product with id ${product.title}, was not saved, as it is out of Stock`,
          );
          productsOutOfStock.push(product);
        }
      }),
    );
    
    if(productsOutOfStock.length) {
      showModalProductOutOfStock(productsOutOfStock);
    }
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
      const newBasketId = await createShoppingCartAction();
      if (!newBasketId) {
        return;
      }
      
      basketId = newBasketId;
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
