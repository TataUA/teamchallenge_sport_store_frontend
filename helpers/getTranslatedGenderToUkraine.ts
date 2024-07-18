const getTranslatedGenderToUkraine = (gender: string) => {
  if(gender.toLowerCase() === 'women')  return "жінки"
  if(gender.toLowerCase() === 'men')  return "чоловіки"
}
export default getTranslatedGenderToUkraine
