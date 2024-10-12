'use client'

// components
import {  useState } from "react"
import {  useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import Image from "next/image"

// components
import ContactsSection from "./ContactsSection"
import DeliverSection from "./DeliverSection"
import ListProducts from "./ListProducts"
import PaymentSection from "./PaymentSection"

// utils
import { cn } from "@/services/utils/cn"
import createOrderHelper from "@/helpers/createOrderHelper"

// selectors
import { selectUserData } from "@/redux/auth/authSelector"
import { selectOrder } from "@/redux/order/orderSelector"

// assets
import wrong from "@/public/icons/auth/wrong.svg";

// selector
import { selectCart } from "@/redux/cart/cartSelector"

// slice
import { cleanCart } from "@/redux/cart/cartSlice"
import AnimatedLabelInputCustom from "../Shared/AnimatedLabelInputCustom"

  export interface IntInitialStateOrder {
      deliveryType: 'Branch' | 'Courier' | 'Parcel Locker' | null,
      city: string | null,
      department: string | null,
      payment: 'Card' | "Upon Receipt" | null,
    }

  export interface IntInitialStateErrors {
    name?: string,
    surname?: string,
    patronymic?: string,
    phone?: string,
    email?: string,
    id?: number,
    street?: string,
    numberHouse?: string,
    numberAppartment?: string,
    department?: string,
  }

const OrderPageComponent = () => {

  const order = useSelector(selectOrder)
  const cart = useSelector(selectCart)
  const user = useSelector(selectUserData)

  const dispatch = useDispatch()

  const router = useRouter()

  const initialState = {
    name: '',
    surname: '',
    patronymic: '',
    phone: '',
    email: '',
    id: 0
  }

  const initialStateOrder: IntInitialStateOrder = {
    deliveryType: null,
    city: null,
    department: null,
    payment: null,
  }

  const initialDeliveryAddress = {
    street: '',
    numberHouse: '',
    numberAppartment: '',
  }
  
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState<IntInitialStateErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const [orderState, setOrderState] = useState<IntInitialStateOrder>(initialStateOrder)
  const [deliveryAddress, setDeliveryAddress] = useState(initialDeliveryAddress)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    delete errors[name as keyof typeof errors];
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleChangeDeliveryAddress = (property: string, value:string) => {
    setDeliveryAddress(prevState => ({
          ...prevState,
          [property]: value
        })
      );
  };

    const handleChangeOrder = (property: keyof IntInitialStateOrder, value:string) => {
      setOrderState(prevState => {
        if(prevState[property] === value) {
          return ({
            ...prevState,
            [property]: ''
          })
        }
        return ({
          ...prevState,
          [property]: value
        })
      });
    };

  const validateForm = () => {
    let newErrors:IntInitialStateErrors = {};

    if(!user) {
      Object.keys(formData).forEach(key => {
        const typedKey = key as keyof typeof formData;
        if (!formData[typedKey] && typedKey !== 'id') {
          newErrors[typedKey] = undefined;
        }
      });
      
      if ((formData.phone)) {
        if(formData.phone.length !== 13) {
          newErrors.phone = "Номер телефону некоректний"
        };
        if(!formData.phone.startsWith('+380')) { 
          newErrors.phone = "Номер телефону повинен починатися з +380"
        };
      }
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (formData.email && !emailRegex.test(formData.email)) {
        newErrors.email = "Невірний формат email";
      }

    }

    if(orderState.deliveryType === 'Courier') {
      Object.keys(deliveryAddress).forEach(key => {
        const typedKey = key as keyof typeof deliveryAddress;
        if (!deliveryAddress[typedKey] && (typedKey !== 'numberAppartment')) {
          newErrors[typedKey] = '';
        }
      });
    }

    if(orderState.deliveryType && orderState.deliveryType !== 'Courier') {
      if (!orderState.department) {
        newErrors['department'] = 'Не вибране відділення або поштомат';
      }
    }

    setErrors(newErrors);
    console.log({newErrors, orderState, deliveryAddress});
    
    return (Object.keys(newErrors).length === 0)
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (!validateForm()) return

    if(!cart.products.length) return

    const userData = user ? user : formData

    try {
      createOrderHelper({userData, orderState, deliveryAddress, cart}, successfulyRedirect)
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error)
    }
  };

  const successfulyRedirect = (response: any) => {
    dispatch(cleanCart())
    localStorage.removeItem('basketId')

    if(orderState.payment === 'Card') {
      const encodedPaymentForm = encodeURIComponent(response.payment_form);
      console.log("🚀 ~ successfulyRedirect ~ encodedPaymentForm:", encodedPaymentForm)
      router.push(`/order/payment?paymentForm=${encodedPaymentForm}`);
      return;
    } 

    router.push("/order/success");
  }

  const fields = [
    { name: 'name', placeholder: "Ім'я", error: submitted && errors.hasOwnProperty('name') },
    { name: 'surname', placeholder: 'Прізвище', error: submitted && errors.hasOwnProperty('surname') },
    { name: 'patronymic', placeholder: 'По-батькові', error: submitted && errors.hasOwnProperty('patronymic') },
    { name: 'phone', placeholder: 'Номер телефону', error: submitted && errors.hasOwnProperty('phone') },
    { name: 'email', placeholder: 'Електронна пошта', error: submitted && errors.hasOwnProperty('email') },
  ];

  return (
    <div className="pt-4">
      <h1 
      className="text-[#1A1A1C] text-2xl font-bold md:text-2xl lg:text-3xl min-[2800px]:lg:text-5xl"
      >
        Оформлення замовлення
      </h1>
      <form
        onSubmit={handleSubmit} 
        className="flex flex-col gap-10 lg:gap-[60px] lg:pt-6 min-[2800px]:pt-8 min-[2800px]:gap-[60px]"
      >
        <ContactsSection>
        <div className="flex flex-col">
          {fields.map((field) => (
            <div key={field.name} className="relative">
              <AnimatedLabelInputCustom
                classname={cn('w-full border-b pb-2 pt-1 focus:outline-none placeholder-gray-500',{
                  'border-gray': true,
                  'border-red placeholder-red': field.error,
                })}
                type="text" 
                value={formData[field.name as keyof typeof formData] || ''}
                placeholder={field.placeholder}
                label={field.placeholder} 
                onChange={handleChange}
                id={field.name}
                name={field.name}
              />
              {field.error && (
                <>
                  <div className={cn("flex items-center mt-4",{
                    'absolute right-0 bottom-[8px] m-0': true
                  })}>
                  <Image src={wrong} width={18} height={18} alt="Іконка помилки" />
                  </div>
                  <div className="absolute text-red text-xs">{errors[field.name as keyof typeof formData]}</div>
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
            className={cn("w-full py-[16px] px-6 text-white bg-blue rounded-xl text-center text-base font-semibold transition-all",
              'hover:bg-[#284695]'
            )}
          >
            Перейти до оплатити
          </button>
          {Object.keys(errors).length > 0 ? (
            <div className="mt-3 text-red text-xs">Вибрані не всі поля або помилка при заповненні</div>
            ) : null}
        </div>
      </form>
    </div>
  )
}

export default OrderPageComponent
