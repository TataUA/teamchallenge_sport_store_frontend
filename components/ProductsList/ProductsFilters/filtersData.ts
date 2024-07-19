export const sortingProductsFilers = [
  {
    title: 'За популярністю',
    id: 'popularity',
  },
  {
    title: 'Від меншої до більшої ціни',
    id: 'ascent',
  },
  {
    title: 'Від більшої до меншої ціни',
    id: 'descent',
  },
]

export const generalProductsFilers = [
  {
    title: 'Розмір',
    shoesPosibleProductTypes: ['shoes', 'sneakers'],
    id: 'sizes',
    sizesShoes: ['36', '37', '38','39', '40', '41','42','43','44','45'],
    sizesClothes: ['S', 'M', 'L','XL', 'XXL']
  },
  {
    title: 'Ціна',
    id: 'price',
    priceFrom: '499',
    priceTo: '10999',
  },
  {
    title: 'Колір',
    id: 'color',
    colorValues: [
      {title: 'Чорний', value: 'black'},
      {title: 'Білий', value: 'white'},
      {title: 'Синій', value: 'blue'},
      {title: 'Кольоровий', value: 'colorful'},
    ]
  },
  {
    title: 'Стать',
    id: 'gender',
    genderValues: [
      {title: 'Жінка', value: 'women'},
      {title: 'Чоловік', value: 'men'},
    ]
  },
]