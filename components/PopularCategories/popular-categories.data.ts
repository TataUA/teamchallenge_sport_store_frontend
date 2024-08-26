interface PopularCategories {
  key: string;
  title: string;
  href: string;
  image: string;
}

export const popularCategories: PopularCategories[] = [
  {
    key: "men-pants",
    title: "Чоловічі штани",
    href: "/products/pants?gender=men&sub_category=pants",
    image: "/images/popular-categories/men-pants.jpg",
  },
  {
    key: "women-t-shirts",
    title: "Жіночі футболки",
    href: "/products/t-shirts?gender=women&sub_category=t-shirts",
    image: "/images/popular-categories/women-t-shirts.jpg",
  },
  {
    key: "women-sneakers",
    title: "Жіночі кросівки",
    href: "/products/sneakers?gender=women&sub_category=sneakers",
    image: "/images/popular-categories/women-sneakers.jpg",
  },
  {
    key: "men-shorts",
    title: "Чоловічі шорти",
    href: "/products/shorts?gender=men&sub_category=shorts",
    image: "/images/popular-categories/men-shorts.jpg",
  },
];
