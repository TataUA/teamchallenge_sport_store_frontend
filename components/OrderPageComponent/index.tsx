"use client";

// components
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";

// components
import ContactsSection from "./ContactsSection";
import DeliverSection from "./DeliverSection";
import ListProducts from "./ListProducts";
import PaymentSection from "./PaymentSection";

// utils
import { cn } from "@/services/utils/cn";
import createOrderHelper from "@/helpers/createOrderHelper";

// selectors
import { selectUserData } from "@/redux/auth/authSelector";
import { selectOrder } from "@/redux/order/orderSelector";

// assets
import wrong from "@/public/icons/auth/wrong.svg";

// selector
import { selectCart } from "@/redux/cart/cartSelector";

// slice
import { cleanCart, setModalProductIsOutOfStock } from "@/redux/cart/cartSlice";
import AnimatedLabelInputCustom from "../Shared/AnimatedLabelInputCustom";
import Script from "next/script";

export interface IntInitialStateOrder {
  deliveryType: "Branch" | "Courier" | "Parcel Locker" | null;
  city: string | null;
  department: string | null;
  payment: "Card" | "Upon Receipt" | null;
}

declare var SDK_Button: any;

export interface IntInitialStateErrors {
  name?: string;
  surname?: string;
  patronymic?: string;
  phone?: string;
  email?: string;
  id?: number;
  street?: string;
  numberHouse?: string;
  numberAppartment?: string;
  department?: string;
}

const OrderPageComponent = () => {
  const order = useSelector(selectOrder);
  const cart = useSelector(selectCart);
  const user = useSelector(selectUserData);

  const dispatch = useDispatch();

  const router = useRouter();

  const initialState = {
    name: "",
    surname: "",
    patronymic: "",
    phone: "",
    email: "",
    id: 0,
  };

  const initialStateOrder: IntInitialStateOrder = {
    deliveryType: null,
    city: null,
    department: null,
    payment: null,
  };

  const initialDeliveryAddress = {
    street: "",
    numberHouse: "",
    numberAppartment: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState<IntInitialStateErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(false);

  const [paymentForm, setPaymentForm] = useState("");

  const [orderState, setOrderState] =
    useState<IntInitialStateOrder>(initialStateOrder);
  const [deliveryAddress, setDeliveryAddress] = useState(
    initialDeliveryAddress,
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    delete errors[name as keyof typeof errors];
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeDeliveryAddress = (property: string, value: string) => {
    setDeliveryAddress((prevState) => ({
      ...prevState,
      [property]: value,
    }));
  };

  const handleChangeOrder = (
    property: keyof IntInitialStateOrder,
    value: string,
  ) => {
    setOrderState((prevState) => {
      if (prevState[property] === value) {
        return {
          ...prevState,
          [property]: "",
        };
      }
      return {
        ...prevState,
        [property]: value,
      };
    });
  };

  const validateForm = () => {
    let newErrors: IntInitialStateErrors = {};

    if (!user) {
      Object.keys(formData).forEach((key) => {
        const typedKey = key as keyof typeof formData;
        if (!formData[typedKey] && typedKey !== "id") {
          newErrors[typedKey] = undefined;
        }
      });

      if (formData.phone) {
        if (formData.phone.length !== 13) {
          newErrors.phone = "Номер телефону некоректний";
        }
        if (!formData.phone.startsWith("+380")) {
          newErrors.phone = "Номер телефону повинен починатися з +380";
        }
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (formData.email && !emailRegex.test(formData.email)) {
        newErrors.email = "Невірний формат email";
      }
    }

    if (orderState.deliveryType === "Courier") {
      Object.keys(deliveryAddress).forEach((key) => {
        const typedKey = key as keyof typeof deliveryAddress;
        if (!deliveryAddress[typedKey] && typedKey !== "numberAppartment") {
          newErrors[typedKey] = "";
        }
      });
    }

    if (orderState.deliveryType && orderState.deliveryType !== "Courier") {
      if (!orderState.department) {
        newErrors["department"] = "Не вибране відділення або поштомат";
      }
    }

    setErrors(newErrors);
    console.log({ newErrors, orderState, deliveryAddress });

    return Object.keys(newErrors).length === 0;
  };

  const showModalProductOutOfStock = () => {
    dispatch(setModalProductIsOutOfStock(true));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (!validateForm()) return;

    if (!cart.products.length) return;

    setIsLoading(true);
    const userData = user ? user : formData;

    try {
      createOrderHelper(
        {
          userData,
          orderState,
          deliveryAddress,
          cart,
        },
        successfulyRedirect,
        showModalProductOutOfStock,
      );
    } catch (error) {
      if(error instanceof Error) {
        console.log("🚀 ~ handleSubmit ~ error:", error);
      }

      setIsLoading(false);
      setPaymentError(true)
    }
  };

  const successfulyRedirect = (response: any) => {
    dispatch(cleanCart());
    localStorage.removeItem("basketId");

    if (orderState.payment === "Card") {
      const decodedForm = response.payment_form
        .replace(/\\"/g, '"')
        .replace(/\n/g, "")
        .replace(/>\s+</g, "><")
        .trim();

      setPaymentForm(decodedForm);

      return;
    }

    router.push("/order/success");
  };

  useEffect(() => {
    if (paymentForm) {
      clickSDKButton();
    }
  }, [paymentForm]);

  const fields = [
    {
      name: "name",
      placeholder: "Ім'я",
      error: submitted && errors.hasOwnProperty("name"),
    },
    {
      name: "surname",
      placeholder: "Прізвище",
      error: submitted && errors.hasOwnProperty("surname"),
    },
    {
      name: "patronymic",
      placeholder: "По-батькові",
      error: submitted && errors.hasOwnProperty("patronymic"),
    },
    {
      name: "phone",
      placeholder: "Номер телефону",
      error: submitted && errors.hasOwnProperty("phone"),
    },
    {
      name: "email",
      placeholder: "Електронна пошта",
      error: submitted && errors.hasOwnProperty("email"),
    },
  ];

  function clickSDKButton() {
    const sdkButton = document.querySelector("sdk-button");

    if (sdkButton) {
      (sdkButton as HTMLElement).click();
    } else {
      console.error("SDK button not found");
    }
  }

  return (
    <div className="pt-4">
      <Script
        src="https://static.liqpay.ua/libjs/sdk_button.js"
        strategy="afterInteractive"
        onLoad={() => {
          (window as any).SDK_Button = SDK_Button;
          if (
            typeof SDK_Button !== "undefined" &&
            !customElements.get("sdk-button")
          ) {
            customElements.define("sdk-button", SDK_Button);
          }
        }}
      />
      <h1 className="text-[#1A1A1C] text-2xl font-bold mb-10 md:text-2xl lg:text-3xl min-[2800px]:lg:text-5xl">
        Оформлення замовлення
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-10 lg:gap-[60px] lg:pt-6 min-[2800px]:pt-8 min-[2800px]:gap-[60px]"
      >
        <ContactsSection>
          <div className="flex flex-col">
            {fields.map((field) => (
              <div
                key={field.name}
                className={`relative ${field.error ? "error" : ""}`}
              >
                <AnimatedLabelInputCustom
                  classname={`${field.error ? "error" : ""}`}
                  classnameInput={`${field.error ? "border-red" : ""}`}
                  classnameLabel={`${field.error ? "text-red" : ""}`}
                  type="text"
                  value={formData[field.name as keyof typeof formData] || ""}
                  placeholder={field.placeholder}
                  label={field.placeholder}
                  onChange={handleChange}
                  id={field.name}
                  name={field.name}
                />
                {field.error && (
                  <>
                    <div
                      className={cn("flex items-center mt-4", {
                        "absolute right-0 bottom-[24px] m-0": true,
                      })}
                    >
                      <Image
                        src={wrong}
                        width={18}
                        height={18}
                        alt="Іконка помилки"
                      />
                    </div>
                    <div className="absolute text-red text-xs">
                      {errors[field.name as keyof typeof formData]}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </ContactsSection>
        <DeliverSection
          orderState={orderState}
          deliveryAddress={deliveryAddress}
          setOrderState={setOrderState}
          handleChangeOrder={handleChangeOrder}
          handleChangeDeliveryAddress={handleChangeDeliveryAddress}
          submitted={submitted}
          errors={errors}
        />
        <PaymentSection
          orderState={orderState}
          setOrderState={setOrderState}
          handleChangeOrder={handleChangeOrder}
          submitted={submitted}
        />
        <ListProducts />
        <div className="flex flex-col justify-center items-center mb-4">
          <button
            type="submit"
            className={cn(
              "w-full py-[16px] px-6 text-white bg-blue rounded-xl flex items-center justify-center text-center text-base font-semibold transition-all",
              "hover:bg-[#284695]",
            )}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 text-center border-gray-200 border-b-blue rounded-full animate-spin"></div>
            ) : (
              "Перейти до оплатити"
            )}
          </button>
          {Object.keys(errors).length > 0 ? (
            <div className="mt-3 text-red text-xs">
              Вибрані не всі поля або помилка при заповненні
            </div>
          ) : null}
          {paymentError ? (
            <div className="mt-3 text-red text-xs">
              Помилка під час спроби замовлення
            </div>
          ) : null}
        </div>
      </form>
      <div className="hidden">
        <div dangerouslySetInnerHTML={{ __html: paymentForm || "" }}></div>
      </div>
    </div>
  );
};

export default OrderPageComponent;
