'use server';

const fetchProductByIdAction = async (id: number | string) => {
  try {
    const result = await fetch(`https://api.sporthubsstore.com/products/${id}/`, { cache: 'no-store', next: { revalidate: 3600 } });
    if(result.status === 200) {
      const data = result?.json()
      return data;
    }
    return [];

  } catch (error: any) {
    console.log("🚀 ~ fetchProductsAction ~ error:", error.response)
  }
}

export default fetchProductByIdAction
