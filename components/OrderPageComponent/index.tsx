'use client'

// components
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Image from "next/image"

// dispatch  type
import { AppDispatch } from "@/redux/store"

// components
import ContactsSection from "./ContactsSection"
import DeliverSection from "./DeliverSection"
import ListProducts from "./ListProducts"
import PaymentSection from "./PaymentSection"

// utils
import { cn } from "@/services/utils/cn"

// slice
import { validationAllFields } from "@/redux/order/orderSlice"

// services
import { createOrder, IOrder } from "@/services/api"

// selectors
import { selectUserData } from "@/redux/auth/authSelector"
import { selectOrder } from "@/redux/order/orderSelector"

// assets
import wrong from "@/public/icons/auth/wrong.svg";

const OrderPageComponent = () => {

  const order = useSelector(selectOrder)
  const user = useSelector(selectUserData)

  const dispatch: AppDispatch = useDispatch();

  const initialState = {
    name: '',
    surname: '',
    patronymic: '',
    phone: '',
    email: '',
    id: 0
  }

  interface IntInitialStateErrors {
    name?: string,
    surname?: string,
    patronymic?: string,
    phone?: string,
    email?: string,
    id?: number,
  }
  
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState<IntInitialStateErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setErrors(prevState => ({
      ...prevState,
      [name]: ''
    }))
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    let newErrors:IntInitialStateErrors = {};
    
    Object.keys(formData).forEach(key => {
      const typedKey = key as keyof typeof formData;
      if (!formData[typedKey]) {
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    await dispatch(validationAllFields())

    if(!user) {
      if (!validateForm()) return
    }

    const userData = user ? user : formData
    
    if(order.allFileds) {
      console.log("Form submitted:", {...order, ...userData});

      try {
        const newOrder: IOrder = {
        basketId: JSON.parse(localStorage.getItem('basketId') || ""),
        first_name: userData?.name,
        last_name: userData.patronymic,
        email: userData.email,
        surname: userData.surname,
        delivery_method: order.department?.Description || '',
        city: order.city?.Present || '',
        appartment: order.deliveryAddress.numberAppartment,
        street: order.deliveryAddress.street,
        user: userData?.id || 0,
        payment_method: order.payment.card ? 'card' : 'cash',
      }

        const response = createOrder(newOrder)
        console.log("🚀 ~ handleSubmit ~ response:", response)
      } catch (error) {
        console.log("🚀 ~ handleSubmit ~ error:", error)
        
      }
    }
  };

  const fields = [
    { name: 'name', placeholder: "Ім'я", error: submitted && errors.hasOwnProperty('name') },
    { name: 'surname', placeholder: 'Прізвище', error: submitted && errors.hasOwnProperty('surname') },
    { name: 'patronymic', placeholder: 'По-батькові', error: submitted && errors.hasOwnProperty('patronymic') },
    { name: 'phone', placeholder: 'Номер телефону', error: submitted && errors.hasOwnProperty('phone') },
    { name: 'email', placeholder: 'Електронна пошта', error: submitted && errors.hasOwnProperty('email') },
  ];

  // console.log(JSON.parse(localStorage.getItem('basketId') || ""), typeof localStorage.getItem('basketId'));
  
  
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
        <div className="flex flex-col gap-4">
          {fields.map((field) => (
            <div key={field.name} className="mb-4 relative">
              <input
                type="text"
                id={field.name}
                name={field.name}
                value={formData[field.name as keyof typeof formData]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className={cn('w-full border-b pb-2 pt-1 focus:outline-none placeholder-gray-500',{
                  'border-gray': true,
                  'border-red placeholder-red': field.error,
                })}
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
        <DeliverSection />
        <PaymentSection />
        <ListProducts />
        <div className="flex justify-center items-center mb-4">
          <button
            type="submit"
            className={cn("w-full py-[16px] px-6 text-white bg-blue rounded-xl text-center text-base font-semibold transition-all",
              'hover:bg-[#284695]'
            )}
          >
            Перейти до оплатити
          </button>
        </div>
      </form>
    </div>
  )
}

export default OrderPageComponent
