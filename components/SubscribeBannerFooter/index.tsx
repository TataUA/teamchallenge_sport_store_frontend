'use client'

import { useState } from "react";
import Image from "next/image";

// utils
import { cn } from "@/services/utils/cn";

// assets
import banner from '../../public/images/footer/subscribe.png'
import getSuccessBlueIcon from "@/helpers/getSuccessBlueIconSVG";

const SubscribeBannerFooter = () => {

  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState('')

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target?.value)
  }
  
  const handleSubscribeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if(!email?.length) {
      return
    }
    
    setSubmitted(true)
    setEmail('')

    // TODO update action - data should be saved into DB, 
    // TODO we will implement it after backend is ready
    // at the moment icon successed appears only
    setTimeout(()=>{
      setSubmitted(false)
    },3000)
  }

  return (
    <div className="relative">
      <div className="absolute z-[1] w-[100%] h-[100%]">
        <Image
            src={banner.src}
            layout="fill"
            objectFit="cover"
            quality={100}
            alt="image"
        />
      </div>
      <div 
        className={cn("pt-8 px-6 pb-12 min-h-[400px] relative z-[2] text-[#fff]")} 
      >
        <form 
            onSubmit={handleSubscribeSubmit}
          >
          <div className={cn('text-5xl mb-3 font-extrabold min-h-[96px] align-middle', 
            'max-[767px]:text-3xl max-[767px]:mb-2',
            'min-[2800px]:text-7xl')}>Знижка -15% на першу покупку</div>
          <p className={cn('text-lg mb-8', 'max-[767px]:text-base max-[767px]:mb-6', 'min-[2800px]:text-3xl')}>
            Delectus harum. Pariatur quia omnis veniam dicta non quo. Quibusdam soluta possimus dolor 
          </p>
          <input 
            className={cn(
              "bg-transparent border-b-[1px] text-inherit mb-8 py-1.5 focus-visible:border-[blue] outline-none text-base placeholder:text-inherit",
              'max-[767px]:w-[100%]', 
              "min-[2800px]:mb-12 min-[2800px]:text-3xl")} 
            type="email"
            value={email}
            placeholder="Email"
            onChange={handleEmailChange} 
          />
          <br />
          <button 
            disabled={submitted}
            className={cn('text-[#1A1A1C] min-w-[140px] py-3 px-8 bg-white rounded-2xl hover:opacity-70 disabled:hover:opacity-100', 
            'max-[767px]:px-6 max-[767px]:rounded-xl',
            'min-[2800px]:text-3xl min-[2800px]:min-w-[235px]')}>{
              submitted ? (
                <span 
                  className="[&>svg]:w-5 [&>svg]:h-5 [&>svg]:m-auto min-[2800px]:[&>svg]:w-8 min-[2800px]:[&>svg]:h-9"
                >
                  {getSuccessBlueIcon()}
                </span>
              ) : 'Підписатися'}
              </button>
        </form>
      </div>
    </div>
  )
};

export default SubscribeBannerFooter
