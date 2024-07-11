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

type GenderEnum = "Male" | "Female"

interface Category {
    id: number;
    gender: GenderEnum;
    sub_category: string;
}

interface Color {
    id: number;
    title: string;
}

interface ProductSize {
    id: number;
    value: string;
}

interface ProductImage {
    id: number;
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
    quantity: string;
}
