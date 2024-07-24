const getCorrectQueryParamsSearchQuery = (query: string): string => {
  type Category = 'шорти' | 'кросівки' | 'кеди' | 'світшоти' | 'футболки' | 'штани';
  type Color = 'білий' | 'чорний' | 'синій' | 'кольоровий';


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
  const categoryMatched = arrayOfCategories.filter(category => category === query)
  if(categoryMatched?.length) {
    return `category=${categoryMatched[0]}`
  }

  if(objectOfColors.hasOwnProperty(query)) {
    return `color=${objectOfColors[query as Color]}`
  }

  return ''
}

export default getCorrectQueryParamsSearchQuery
