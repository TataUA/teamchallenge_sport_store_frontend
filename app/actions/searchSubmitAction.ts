'use client';

import getCorrectQueryParamsSearchQuery from "@/helpers/getCorrectQueryParamsSearchQuery";

const searchSubmitAction = async (params: string) => {
  const extractedParams = getCorrectQueryParamsSearchQuery(params)
  try {
    const result = await fetch(`https://api.sporthubsstore.com/products/search/?${extractedParams}`, { cache: 'no-store' });
    if(result.status === 200) {
      const data = await result?.json()
      return data;
    }
    return [];
  } catch (error: any) {
    console.log("🚀 ~ searchSubmitAction ~ error:", error.response)
  }
}

export default searchSubmitAction
