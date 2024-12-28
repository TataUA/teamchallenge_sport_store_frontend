import { NavItem } from "@/services/types";

export const NAV_ITEMS: NavItem[] = [
  {
    title: {
      key: "men",
      label: "Чоловіки",
      href: "/productsGender/men",
      image: "/images/gender/man.jpg",
    },
    links: [
      {
        key: "sneakers",
        label: "Кросівки",
        href: "/products/sneakers?gender=men&sub_category=sneakers",
      },
      {
        key: "t-shirts",
        label: "Футболки",
        href: "/products/t-shirts?gender=men&sub_category=t-shirts",
      },
      {
        key: "shorts",
        label: "Шорти",
        href: "/products/shorts?gender=men&sub_category=shorts",
      },
      {
        key: "pants",
        label: "Штани",
        href: "/products/pants?gender=men&sub_category=pants",
      },
      {
        key: "sweatshirts",
        label: "Світшоти",
        href: "/products/sweatshirts?gender=men&sub_category=sweatshirts",
      },
    ],
  },
  {
    title: {
      key: "women",
      label: "Жінки",
      href: "/productsGender/women",
      image: "/images/gender/women.jpg",
    },
    links: [
      {
        key: "sneakers",
        label: "Кросівки",
        href: "/products/sneakers?gender=women&sub_category=sneakers",
      },
      {
        key: "t-shirts",
        label: "Футболки",
        href: "/products/t-shirts?gender=women&sub_category=t-shirts",
      },
      {
        key: "shorts",
        label: "Шорти",
        href: "/products/shorts?gender=women&sub_category=shorts",
      },
      {
        key: "pants",
        label: "Штани",
        href: "/products/pants?gender=women&sub_category=pants",
      },
      {
        key: "sweatshirts",
        label: "Світшоти",
        href: "/products/sweatshirts?gender=women&sub_category=sweatshirts",
      },
    ],
  },
];
