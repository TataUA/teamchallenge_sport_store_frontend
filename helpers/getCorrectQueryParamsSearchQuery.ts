const getCorrectQueryParamsSearchQuery = (query: string): string => {
  type Category = 'шорти' | 'кросівки' | 'кеди' | 'світшоти' | 'футболки' | 'штани';
  type Color = 'білий' | 'чорний' | 'синій' | 'кольоровий';

  const splittedWords = query.split(' ')
  const arrayOfCategories: Category[] = [
    'шорти',
    'кросівки',
    'кеди',
    'світшоти',
    'футболки',
    'штани',
  ]
  const objectOfColors: Record<Color, string> = {
    білий: 'white',
    чорний: 'black',
    синій: 'blue',
    кольоровий: 'colorful',
  }
  let queryParams = ''
  
  splittedWords.map((word) => {
    const categoryMatched = arrayOfCategories.filter(category => category === word)
    if(categoryMatched?.length) {
      queryParams += `category=${categoryMatched[0]}`
    }
  
    if(objectOfColors.hasOwnProperty(word)) {
      if(queryParams) {
        queryParams += `&color=${objectOfColors[word as Color]}`
      } else {
        queryParams += `color=${objectOfColors[word as Color]}`
      }
    }
  })

  return queryParams
}

export default getCorrectQueryParamsSearchQuery
