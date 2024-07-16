const extractProductTypeFromParamsAndTranslateUkraine = (sub_category: string) => {
    let correctProdType = ''
    switch (sub_category) {
      case 'sneakers':
        correctProdType = 'Кросівки'
        break;
      case 't-shirts':
        correctProdType = 'Футболки'
        break;
      case 'shorts':
        correctProdType = 'Шорти'
        break;
      case 'pants':
        correctProdType = 'Штани'
        break;
      case 'sweatshirts':
        correctProdType = 'Світшоти'
        break;
    
      default:
        break;
    }
    return correctProdType
  }

  export default extractProductTypeFromParamsAndTranslateUkraine
  