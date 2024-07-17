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
        if(filter.sizes){
            // console.log("🚀 ~ getFilteredProducts ~ filter.sizes:", filter.sizes)
            // const t = filter.sizes.split(',')
            // console.log("🚀 ~ getFilteredProducts ~ t:", t)
            // return product.size.some(s => s.value.toLowerCase().includes(filter.sizes.toLowerCase()))
            const filterSizes = filter.sizes.split(',')?.map((s: string) => s.trim().toLowerCase());
            const productSizes = product.size.map(s => s.value.toLowerCase());
            return filterSizes.some((size: string) => productSizes.includes(size));
        }
            
        return product
    })
    }
);

export default getFilteredProducts
