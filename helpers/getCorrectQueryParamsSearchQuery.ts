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
  const arrayOfColors: Color[] = [
    'білий',
    'чорний',
    'синій',
    'кольоровий',
  ]
  const objectOfColors: Record<Color, string> = {
    білий: 'white',
    чорний: 'black',
    синій: 'blue',
    кольоровий: 'colorful',
  }
  let queryParams = ''
  
  splittedWords.map((word) => {
    if(word?.length < 3) return
    
    const categoryMatched = arrayOfCategories.filter(category => category.includes(word))
    const colorsMatched = arrayOfColors.filter(color => color.includes(word))
    if(categoryMatched?.length) {
      queryParams += `category=${categoryMatched[0]}`
    }
  
    if(objectOfColors.hasOwnProperty(colorsMatched[0])) {
      if(queryParams) {
        queryParams += `&color=${objectOfColors[colorsMatched[0] as Color]}`
      } else {
        queryParams += `color=${objectOfColors[colorsMatched[0] as Color]}`
      }
    }
  })

  return queryParams
}

export default getCorrectQueryParamsSearchQuery
