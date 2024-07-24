import { IProduct } from "@/services/types"
import { cn } from "@/services/utils/cn"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface IProps {
  product: IProduct
  onClose?: () => void
}

const ProductCardInfo = (props: IProps) => {
  const {product, onClose} = props

  const router = useRouter()

  const handleClickItem = () => {
    router.push(`/product/${product.id}/`)
    if(onClose) onClose()
  }

  return (
    <div
      className="flex gap-3 mb-8 hover:bg-gray-100 rounded-xl"
      onClick={() => handleClickItem()}
    >
      <div className={cn("w-[108px] h-[108px] bg-blue rounded-xl overflow-hidden")}>
        <Image 
          width={108} 
          height={108} 
          src={product.colors?.[0]?.image_url} 
          alt='photo_product'
        />
      </div>
      <div className="flex flex-col justify-evenly flex-1">
        <p>{product.title}</p>
        <div className="flex justify-between">
          <span className="text-[#1A1A1C] font-semibold text-base">{product.price} грн</span>
        </div>
      </div>
    </div>
  )
}

export default ProductCardInfo
