'use server';

const fetchProductsAction = async () => {
  try {
    const result = await fetch("https://api.sporthubsstore.com/products/");
    console.log("🚀 ~ fetchProductsAction ~ result:", result)
    if(result.status === 200) {
      const data = await result?.json()
      console.log("🚀 ~ fetchProductsAction ~ data:", await data)
      return data;
    }
    return [];
  } catch (error: any) {
    console.log("🚀 ~ fetchProductsAction ~ error:", error.response)
  }
}

export default fetchProductsAction
