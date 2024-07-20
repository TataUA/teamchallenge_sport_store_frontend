'use client'

import getCheckedIconSVG from "@/helpers/getCheckedIconSVG";
import { cn } from "@/services/utils/cn";
import { useSearchParams } from "next/navigation";

interface IProps {
  values: {
    title: string;
    value: string;
}[]
}

const GenderFilter = (props: IProps) => {
  console.log("🚀 ~ GenderFilter ~ props:", props)
  const searchParams = useSearchParams();
  const currentFilterValue = searchParams.get("gender") || '';

  return (
    <ul className="list-none text-base min-[2800px]:text-3xl">
      {props.values.map((item, index) => {
        if(item.value === 'men') return (
        <li 
          key={index}
          className={cn('flex justify-between [&>svg]:hidden', {
            'text-blue [&>svg]:block [&>svg]:ml-auto [&>svg]:size-7 min-[2800px]:[&>svg]:size-12': currentFilterValue.toLocaleLowerCase() === 'men'
          })}
        ><span>
          {item.title}
        </span>
        {getCheckedIconSVG()}
        </li>
      )
      return (
        <li 
          key={index}
          className={cn('flex justify-between [&>svg]:hidden mb-5', {
            'text-blue [&>svg]:block [&>svg]:ml-auto [&>svg]:size-7 min-[2800px]:[&>svg]:size-12': currentFilterValue.toLocaleLowerCase() === 'women'
          })}
        >
        <span>
          {item.title}
        </span>
        {getCheckedIconSVG()}
        </li>
      )
      })}
    </ul>
  )
}

export default GenderFilter
