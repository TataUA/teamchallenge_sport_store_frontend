import { IProduct } from "@/services/types"

const getArrayWithExtractedImgUrl = (product: IProduct) => (product.images.map((image) => ({image: image.image_url})))

export default getArrayWithExtractedImgUrl
