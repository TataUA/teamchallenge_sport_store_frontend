'use client'

import { useRouter } from "next/navigation"

const NavigationComponent = ({subCategory}: {subCategory: string}) => {
  const router = useRouter()
  return (
      <div 
        className='flex items-center gap-1 mb-5 cursor-pointer hover:opacity-[50%] text-base font-medium lg:text-sm min-[2800px]:text-4xl min-[2800px]:mb-10'
        >
        <span onClick={() => router.back()}>
          <svg 
            onClick={() => router.back()} 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 18 18" 
            fill="none"
            className="size-5"
          >
            <path d="M11.25 13.5L6.75 9L11.25 4.5" stroke="#272728" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        <span onClick={() => router.back()}>{subCategory}</span>
      </div>
  )
}

export default NavigationComponent
