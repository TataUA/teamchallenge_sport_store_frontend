
// componsnts
import { Slider } from "@/components/slider-hero/Slider"

// helpers
import getArrayWithExtractedImgUrl from "@/helpers/getArrayWithExtractedImgUrl"
import getArrowDownSVG from "@/helpers/getArrowDownSVG"
import getCartSVG from "@/helpers/getCartSVG"
import { cn } from "@/services/utils/cn"

// types
import { IProduct } from "@/services/types"

const ProductInfo = ({product}: {product: IProduct}) => {
const {color, price} = product

const formattedDescription = product.description.replace(/\r\n/g, '<br>');

  return (
    <div>
      <div className="rounded-[12px] overflow-hidden mb-4">
        <Slider
          productsList
          autoPlay={false}
          data={getArrayWithExtractedImgUrl(product)}
          className={'h-[343px] min-[2800px]:h-[1000px] min-[768px]:h-[500px]'} 
          />
      </div>
      <div>
        <div className="text-base mb-4 lg:text-lg min-[2800px]:text-5xl min-[2800px]:mb-10">
          {product.title}
        </div>
        <div 
          className="text-[#1A1A1C] mb-8 truncate text-2xl font-semibold lg:text-3xl lg:mb-6 min-[2800px]:text-5xl min-[2800px]:mb-10"
        >
          {price + ' грн'}
        </div>
        <div className="mb-8 2xl:mb-16">
          <h4 className="text-base font-semibold mb-2 lg:text-xl lg:mb-4 min-[2800px]:text-5xl min-[2800px]:mb-6">
            Колір
            </h4>
          <ul className="flex gap-2 min-[2800px]:gap-5">
            {color?.map((color)=> (
              <li 
                key={color.id}
                className={cn(
                  `bg-${color.title.toLowerCase()} relative min-w-6 min-h-6 rounded-[50%] min-[2800px]:size-16`, {
                    'border': true,
                  })}
              />
            ))}
          </ul>
        </div>
        <div className="mb-8">
          <h4 className={cn("text-base text-[#272728] font-semibold mb-2s",
            'lg:text-xl 2xl:5xl 2xl:mb-6 min-[2800px]:text-5xl'
          )}>
            Розмір
          </h4>
          <div className={cn("text-base border-[#868687] border-[1px] rounded-xl py-4 px-4 w-full flex items-center justify-between",
            'lg:max-w-[500px]'
          )}>
            <span className="text-[#868687]">Вибрати Розмір</span>
            {getArrowDownSVG()}
          </div>
          <div className="flex gap-1 text-xs text-[#868687]">
            <span>Вагаєтесь який розмір обрати?</span>
            <span className="text-[#272728] cursor-pointer hover:underline">Розмірна сітка</span>
          </div>
        </div>
        <div className={cn("bg-blue mb-8 w-full text-white py-4 px-10 fill-white cursor-pointer flex justify-center items-center gap-2 rounded-xl",
          '[&>svg]:text-white',
          'hover:opacity-[75%]',
          'lg:max-w-[500px] 2xl:3xl',
        )}>
          {getCartSVG()}
          Вибрати Розмір
        </div>
        <div>
          <h4 className="text-base font-medium text-[#272728] lg:text-xl min-[2800px]:text-5xl min-[2800px]:mb-4">Опис</h4>
          <div
          className="text-sm font-medium text-[#575758] lg:text-base 2xl:text-2xl"
          dangerouslySetInnerHTML={{ __html: formattedDescription }}></div>
        </div>
      </div>
    </div>
  )
}

export default ProductInfo
