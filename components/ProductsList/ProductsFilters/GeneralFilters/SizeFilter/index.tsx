'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/services/utils/cn"

interface IProps {
  sizes?: string[]
}

const SizeFilter = (props: IProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentFilterValue = searchParams.get("size") || '';

  const createPageURLWithParams = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("size", value.toString());
    return `${pathname}?${params.toString()}`;
  };

  if(!props.sizes?.length) return null

  return (
    <>
      <div className="flex gap-2 flex-wrap">
        {props.sizes?.map((size, sizeIndex) => (
          <li 
            onClick={() => router.push(createPageURLWithParams(size))}
            className={cn('list-none size-12 rounded-lg border-[1px] p-4 flex justify-center items-center cursor-pointer',
              'hover:bg-blue hover:text-white', {
                'border-[#0A4CF6] text-[#0A4CF6]': currentFilterValue.toLowerCase() === size.toLowerCase()
              }
            )}
            key={sizeIndex}
          >{size}</li>
        ))}
      </div>
    </>
  )
}

export default SizeFilter
