'use server';

const fetchProductsAction = async (subCategory: string) => {
  try {
    const result = await fetch(`https://api.sporthubsstore.com/products/search/?category=${subCategory}`, { next: { revalidate: 3600 } });
    if(result.status === 200) {
      const data = await result?.json()
      return data;
    }
    return [];
  } catch (error: any) {
    console.log("🚀 ~ fetchProductsAction ~ error:", error.response)
  }
}

export default fetchProductsAction
