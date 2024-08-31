'use client'

// core
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"

// selector
import { selectOrder } from "@/redux/order/orderSelector"

// actions
import { validationAllFields } from "@/redux/order/orderSlice"

// utils
import { cn } from "@/services/utils/cn"

const Footer = () => {
  const orderStored = useSelector(selectOrder)
  const dispatch = useDispatch()

  const handleSubmit = () => {
    dispatch(validationAllFields())
  }

  useEffect(()=>{
    console.log(orderStored);
    
  },[orderStored])

  return (
    <div>
      <div className="flex justify-center items-center mb-4">
        <div
        onClick={() => handleSubmit()}
          className={cn("w-full py-[11px] px-6 text-[#fff] bg-blue rounded-xl text-center text-base font-semibold transition-all",
            'hover:bg-[#284695]'
          )}
        >
          Замовити та оплатити
        </div>
      </div>
    </div>
  )
}

export default Footer
