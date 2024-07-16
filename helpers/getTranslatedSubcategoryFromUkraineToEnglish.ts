const getTranslatedSubcategoryFromUkraineToEnglish = (sub_category: string) => {
    let correctProdType = ''
    switch (sub_category.toLowerCase()) {
      case 'кросівки':
        correctProdType = 'sneakers'
        break;
      case 'футболки':
        correctProdType = 't-shirts'
        break;
      case 'шорти':
        correctProdType = 'shorts'
        break;
      case 'штани':
        correctProdType = 'pants'
        break;
      case 'світшоти':
        correctProdType = 'sweatshirts'
        break;
    
      default:
        break;
    }
    return correctProdType
  }

  export default getTranslatedSubcategoryFromUkraineToEnglish
  