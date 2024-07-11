const extractProductTypeFromParamsAndTranslateUkraine = (productType: string) => {
    let correctProdType = ''
    switch (productType) {
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
  