import { IProduct } from "@/services/types";

const getSortedProducts = ({products, direction = 'popularity'}: {products: IProduct[], direction?: string}) => [...products].sort((a, b) => {
      if (a.price < b.price) return direction === 'ascent' ? -1 : 1;
      if (a.price > b.price) return direction === 'descent' ? 1 : -1;
      return 0;
    });

    export default getSortedProducts
    