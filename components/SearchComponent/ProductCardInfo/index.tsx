import { IProduct } from "@/services/types"
import { cn } from "@/services/utils/cn"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface IProps {
  product: IProduct
  onClose?: () => void
  classname?: string
}

const ProductCardInfo = (props: IProps) => {
  const {product, onClose, classname} = props

  const router = useRouter()

  const handleClickItem = () => {
    router.push(`/product/${product.id}/`)
    if(onClose) onClose()
  }

  return (
    <div
      className={cn("flex min-h-6 gap-3 mb-4 pb-4 hover:bg-gray-100 border-b-[1px]", 
        `${classname ? classname : ''}`)}
      onClick={() => handleClickItem()}
    >
      <div className={cn("w-[50px] h-[72px] bg-blue rounded-xl overflow-hidden")}>
        <Image 
          width={50} 
          height={72} 
          src={product.colors?.[0]?.image_url} 
          alt='photo_product'
        />
      </div>
      <div className="flex flex-col justify-evenly flex-1 ">
        <p className="text-ellipsis whitespace-nowrap overflow-hidden max-w-[75vw]">{product.title}</p>
        <p className="text-[#868687]">{product.category.sub_category}</p>
        <div className="flex justify-between">
          <span className="text-[#1A1A1C] font-semibold text-base">{product.price} грн</span>
        </div>
      </div>
    </div>
  )
}

export default ProductCardInfo
