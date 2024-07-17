import { IProduct } from "@/services/types";

import getTranslatedSubcategoryFromUkraineToEnglish from "./getTranslatedSubcategoryFromUkraineToEnglish";

const getFilteredProducts = ({products, filters}: {products: IProduct[], filters: any[]}) => products.filter(product => {
    return filters?.every(filter => {
        if(filter.sub_category) {
            return getTranslatedSubcategoryFromUkraineToEnglish(product.category.sub_category).toLowerCase().includes(filter.sub_category.toLowerCase())
        }
        if(filter.price_to){
            return Number(product.price) <= Number(filter.price_to)
        }
            
        if(filter.price_from){
            return Number(product.price)  >= Number(filter.price_from)
        }
        if(filter.color){
            return product.color.some(c => c.title.toLowerCase().includes(filter.color.toLowerCase()))
        }
        if(filter.size){
            return product.size.some(s => s.value.toLowerCase().includes(filter.size.toLowerCase()))
        }
            
        return product
    })
    }
);

export default getFilteredProducts
