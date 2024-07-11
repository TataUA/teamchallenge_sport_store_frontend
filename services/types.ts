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
}


interface Category {
    id: number;
    gender: string;
    sub_category: string;
}

interface Color {
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

export interface IProduct {
    id: number;
    title: string;
    category: Category;
    description: string;
    price: string;
    color: Color[];
    size: ProductSize[];
    images: ProductImage[];
    quantity: number;
}
