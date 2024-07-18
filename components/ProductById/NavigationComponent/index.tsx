'use client'

import { useRouter } from "next/navigation"

const NavigationComponent = ({subCategory}: {subCategory: string}) => {
  const router = useRouter()
  return (
      <div 
        className='flex gap-2 mb-5 cursor-pointer hover:opacity-[50%] text-base font-medium lg:text-sm min-[2800px]:text-4xl min-[2800px]:mb-10'
        >
        <span onClick={() => router.back()}>&lt;</span>
        <span onClick={() => router.back()}>{subCategory}</span>
      </div>
  )
}

export default NavigationComponent
