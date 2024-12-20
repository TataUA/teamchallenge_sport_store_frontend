export interface NavLink {
  key: string;
  label: string;
  href: string;
  image?: string;
  links?: NavLink[]; // Поддержка вложенных ссылок
}

export interface NavItem {
  title: NavLink;
  links: NavLink[];
}

export interface HidePagePath {
  path: string;
}

export type headerNavItem = {
  href: string;
  name: string;
};

export type SvgProps = {
  path: string;
  viewBox: string;
  fill?: string;
  name?: string;
  fillHovered?: string;
  isHovered?: boolean;
  classname?: string;
  stroke?: string;
  strokeHovered?: string;
};

interface Category {
  id: number;
  gender: string;
  sub_category: string;
}

export interface IColor {
  id: number;
  title: string; // Updated to match the provided object
}

export interface ProductSize {
  id: number;
  value: string;
}

interface ProductImage {
  image_url: string;
}

export interface IColors {
  image_url: string;
  color: IColor;
  title?: string;
}

export interface IQuantity {
  size: string;
  color: string;
  quantity: number;
}

export interface IProduct {
  id: number;
  title: string;
  category: Category;
  description: string;
  price: string;
  colors: IColors[];
  size: ProductSize[];
  images: ProductImage[];
  quantity: IQuantity[];
}

export interface IProductWithMaxQuantity extends IProduct {
  maxQuantity: number;
  idInBasketInDb?: number;
}
