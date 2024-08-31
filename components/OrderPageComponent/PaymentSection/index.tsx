'use client'

// core
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

// selector
import { selectOrder } from "@/redux/order/orderSelector";

// actions
import { handleClickCheckboxPayment } from "@/redux/order/orderSlice";

// components
import { InputLabelField } from "@/components/Auth/InputLabelField";
import CardInfoForm from "./CardInfoForm";

// assets
import wrong from "@/public/icons/wrong.svg";

const PaymentSection = () => {
  const dispatch = useDispatch()

  
  const {payment, allFileds} = useSelector(selectOrder)

  const handleOnChangePayment = (id: string) => {
    dispatch(handleClickCheckboxPayment(id))
  };

  const checkboxClassname = "w-5 h-5 rounded-xl"
  const labelCheckboxClassname = "flex gap-2 items-center"
  const titleCheckboxClassname = "text-sm text-[#272728] font-medium"

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 
          className="text-[#1A1A1C] text-2xl font-bold md:text-2xl lg:text-3xl min-[2800px]:lg:text-5xl"
        >
          Оплата
        </h3>
        {!payment.card && !payment.cash && (allFileds === false) ? (
          <div className="flex gap-2 items-center">
            <Image src={wrong} width={18} height={18} alt="Іконка помилки" />
            <span
                className='min-w-min whitespace-nowrap h-max-content text-red text-xs'
            >
              Оберіть метод оплати
            </span>
          </div>
        ) : null}
      </div>
      <div className="mb-4">
        <label className={labelCheckboxClassname}>
          <input 
            className={checkboxClassname} 
            type="checkbox" 
            id="cash" 
            name="cash" 
            value="cash" 
            checked={payment.cash}
            onChange={() => handleOnChangePayment("cash")} 
            />
            <div className="flex flex-col">
              <span className={titleCheckboxClassname}>Оплата при отриманні замовлення</span>
              <span 
                className='text-xs text-[#868687] font-inter'
              >
                Комісія 20грн + 3.2% від суми замовлення
              </span>
            </div>
        </label>
      </div>
      <div>
        <label className={labelCheckboxClassname}>
          <input 
            className={checkboxClassname}
            type="checkbox" 
            id="card" 
            name="card" 
            value="card" 
            checked={payment.card}
            onChange={() => handleOnChangePayment("card")} />
          <span className={titleCheckboxClassname}>Оплата карткою</span>
        </label>
      </div>
      {payment.card ? <CardInfoForm /> : null}
    </div>
  )
}

export default PaymentSection
