'use client'

// core
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// selector
import { selectOrder } from "@/redux/order/orderSelector";

// slice
import { handleClickCheckboxDelivery } from "@/redux/order/orderSlice";

// components
import CustomCitiesDropdown from "./CustomCitiesDropdown";
import CustomDepartmentsDropdown from "./CustomDepartmentsDropdown";
import DeliveryManForm from "./DeliveryManForm";

// utils
import { cn } from "@/services/utils/cn";

// assets
import wrong from "@/public/icons/wrong.svg";
import getNovaPoshtaIconSVG from "@/helpers/getNovaPoshtaIconSVG";

const DeliverSection = () => {
  const dispatch = useDispatch()

  const [error, setError] = useState(false)
  
  const {deliveryType, city, department, postOffice, allFileds} = useSelector(selectOrder)

  const handleOnChangeDelivery = (id: string) => {
    if(!city) {
      setError(true)
      return
    }
    
    dispatch(handleClickCheckboxDelivery(id))
    setError(false)
  };

  useEffect(()=>{
    if(city && error) setError(false)
  },[city, error])

  const checkboxClassname = "w-5 h-5 rounded-xl"
  const labelCheckboxClassname = "flex gap-2 mb-2 items-center"
  const titleCheckboxClassname = "text-sm text-[#272728] font-medium"

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 
          className="text-[#1A1A1C] text-2xl font-bold md:text-2xl lg:text-3xl min-[2800px]:lg:text-5xl"
        >
          Доставка
        </h3>
        {!city && error ? (
          <div className="flex gap-2 items-center">
            <Image src={wrong} width={18} height={18} alt="Іконка помилки" />
            <span
                className='min-w-min whitespace-nowrap h-max-content text-red text-xs'
            >
              Оберіть місто доставки
            </span>
          </div>
        ) : null}
        {!department && !postOffice && (allFileds === false) ? (
          <div className="flex gap-2 items-center">
            <Image src={wrong} width={18} height={18} alt="Іконка помилки" />
            <span
                className='min-w-min whitespace-nowrap h-max-content text-red text-xs'
            >
              Оберіть оберіть відділення або поштомат
            </span>
          </div>
        ) : null}
      </div>
      <CustomCitiesDropdown error={error} />
      <div className={cn("mb-4",{'opacity-[50%]': !city})}>
        <label className={labelCheckboxClassname}>
          <input 
            className={checkboxClassname} 
            type="checkbox" 
            id="department" 
            name="department" 
            value="department" 
            checked={deliveryType.department}
            onChange={() => handleOnChangeDelivery("department")} 
          />
          <span className={titleCheckboxClassname}>Відділення Нова пошта</span>
          {getNovaPoshtaIconSVG()}
        </label>
        {deliveryType.department ? <CustomDepartmentsDropdown city={city} selectedItem={department} typeOfEntity='department' /> : null}
      </div>
      <div className={cn("mb-4",{'opacity-[50%]': !city})}>
        <label className={labelCheckboxClassname}>
          <input 
            className={checkboxClassname} 
            type="checkbox" 
            id="postOffice" 
            name="postOffice" 
            value="postOffice" 
            checked={deliveryType.postOffice}
            onChange={() => handleOnChangeDelivery("postOffice")} 
            />
          <span className={titleCheckboxClassname}>Поштомат Нова пошта</span>
          {getNovaPoshtaIconSVG()}
        </label>
        {deliveryType.postOffice ? <CustomDepartmentsDropdown city={city} selectedItem={postOffice} typeOfEntity='postOffice' /> : null}
      </div>
      <div className={cn("",{'opacity-[50%]': !city})}>
        <label className={labelCheckboxClassname}>
          <input 
            className={checkboxClassname} 
            type="checkbox" 
            id="deliveryMan" 
            name="deliveryMan" 
            value="deliveryMan" 
            checked={deliveryType.deliveryMan}
            onChange={() => handleOnChangeDelivery("deliveryMan")} 
          />
          <span className={titleCheckboxClassname}>Курєром Нова пошта</span>
          {getNovaPoshtaIconSVG()}
        </label>
        {deliveryType.deliveryMan ? <DeliveryManForm /> : null}
      </div>
    </div>
  )
}

export default DeliverSection
