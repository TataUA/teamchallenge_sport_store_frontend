import { IProduct } from "@/services/types";

const getSortedProducts = ({products, direction = 'popularity'}: {products: IProduct[], direction?: string}) => [...products].sort((a, b) => {
      const aPrice = Number(a.price);
      const bPrice = Number(b.price);
      if (direction === 'ascent') {
        return aPrice - bPrice;
      } else if (direction === 'descent') {
        return bPrice - aPrice;
      }
      return 0;
    });

    export default getSortedProducts
    