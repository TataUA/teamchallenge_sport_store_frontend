
// componsnts
import { Slider } from "@/components/slider-hero/Slider"

// helpers
import getArrayWithExtractedImgUrl from "@/helpers/getArrayWithExtractedImgUrl"
import getTranslatedSubcategoryFromUkraineToEnglish from "@/helpers/getTranslatedSubcategoryFromUkraineToEnglish"

// components
import SizesModal from "./SizesModal"
import { ClientComponent } from "@/components/ClientComponent"
import AddProductToCartComponent from "./AddProductToCartComponent"
import ColorPickerComponent from "./ColorPickerComponent"
import SliderComponent from "./SliderComponent"

// types
import { IProduct } from "@/services/types"

const ProductInfo = ({product}: {product: IProduct}) => {
const {colors, price, size, category} = product

const formattedDescription = product.description.replace(/\r\n/g, '<br>');
const translatedSubCategory = getTranslatedSubcategoryFromUkraineToEnglish(category.sub_category)

  return (
    <div>
      <ClientComponent>
        <SliderComponent />
        <div>
          <div className="text-base mb-4 lg:text-lg min-[2800px]:text-5xl min-[2800px]:mb-10">
            {product.title}
          </div>
          <div 
            className="text-[#1A1A1C] mb-8 truncate text-2xl font-semibold lg:text-3xl lg:mb-6 min-[2800px]:text-5xl min-[2800px]:mb-10"
          >
            {price + ' грн'}
          </div>
          <ColorPickerComponent colors={colors} />
          <SizesModal translatedSubCategory={translatedSubCategory} existedSizesFromDb={size} />
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
