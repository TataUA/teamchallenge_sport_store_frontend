export interface NavLink {
	key: string
	label: string
	href: string
	links?: NavLink[] // Поддержка вложенных ссылок
}

export interface NavItem {
	title: NavLink
	links: NavLink[]
}

export interface HidePagePath {
	pathname: string
	path: string
}

export type headerNavItem = {
	href: string
	name: string
}

export type SvgProps = {
	path: string
	viewBox: string
	fill?: string
	name?: string
	fillHovered?: string
	isHovered?: boolean
    classname?: string
}


interface Category {
    id: number;
    gender: string;
    sub_category: string;
}

export interface IColor {
    id: number;
    title: string; // Updated to match the provided object
}

interface ProductSize {
    id: number;
    value: string;
}

interface ProductImage {
    image_url: string;
}

export interface IColors {
    image_url: string, 
    color: IColor
}

export interface IProduct {
    id: number;
    title: string;
    category: Category;
    description: string;
    price: string;
    colors: IColors[]
    size: ProductSize[];
    images: ProductImage[];
    quantity: {
        size: string
        color: string
        quantity: number
    };
}
