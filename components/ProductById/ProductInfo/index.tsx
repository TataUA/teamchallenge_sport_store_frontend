
// componsnts
import { Slider } from "@/components/slider-hero/Slider"

// helpers
import getArrayWithExtractedImgUrl from "@/helpers/getArrayWithExtractedImgUrl"

// components
import SizesModal from "./SizesModal"
import { ClientComponent } from "@/components/ClientComponent"
import AddProductToCartComponent from "./AddProductToCartComponent"
import ColorPickerComponent from "./ColorPickerComponent"

// types
import { IProduct } from "@/services/types"

const ProductInfo = ({product}: {product: IProduct}) => {
const {color, price, size} = product

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
      <ClientComponent>
        <div>
          <div className="text-base mb-4 lg:text-lg min-[2800px]:text-5xl min-[2800px]:mb-10">
            {product.title}
          </div>
          <div 
            className="text-[#1A1A1C] mb-8 truncate text-2xl font-semibold lg:text-3xl lg:mb-6 min-[2800px]:text-5xl min-[2800px]:mb-10"
          >
            {price + ' грн'}
          </div>
          <ColorPickerComponent color={color} />
          <SizesModal sizeFromDb={size} />
          <AddProductToCartComponent product={product}/>
          <div>
            <h4 className="text-base font-medium text-[#272728] lg:text-xl min-[2800px]:text-5xl min-[2800px]:mb-4">Опис</h4>
            <div
            className="text-sm font-medium text-[#575758] lg:text-base 2xl:text-2xl"
            dangerouslySetInnerHTML={{ __html: formattedDescription }}></div>
          </div>
        </div>
      </ClientComponent>
    </div>
  )
}

export default ProductInfo
