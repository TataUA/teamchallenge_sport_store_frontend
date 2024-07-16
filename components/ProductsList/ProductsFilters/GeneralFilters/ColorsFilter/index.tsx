'use client'

import getCheckedIconSVG from "@/helpers/getCheckedIconSVG";
import { cn } from "@/services/utils/cn"
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface IProps {
  colors: {title: string, value: string}[]
}

const ColorsFilter = (props: IProps) => {

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentFilterValue = searchParams.get("color") || '';

  const createPageURLWithPageParams = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if(params.get('color') === value) {
      params.delete('color')
      
      return `${pathname}?${params.toString()}`;
    }
    params.set("color", value.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <ul className="list-none">
      {props.colors.map((colorItem, index) => (
        <li
          className={cn('flex list-none items-center gap-3 mb-2 text-[#272728] cursor-pointer',
            '[&>svg]:hidden', {
            'text-[#083DC5] [&>svg]:block [&>svg]:ml-auto [&>svg]:size-7': currentFilterValue === colorItem.value
          })}
          onClick={() => router.push(createPageURLWithPageParams(colorItem.value))}
          key={index}
        >
          <span className={cn('size-8 rounded-[50%]', `bg-${colorItem.value.toLocaleLowerCase()}`,{
            'border-[1px]': colorItem.value.toLocaleLowerCase() === 'white',
            'bg-colorful-circle bg-center bg-cover': colorItem.value.toLocaleLowerCase() === 'colorful',
          })} />
          <span className={cn('text-base font-medium')} >
            {colorItem.title}
          </span>
          {getCheckedIconSVG()}
          {}
        </li>
      ))}
    </ul>
  )
}

export default ColorsFilter
