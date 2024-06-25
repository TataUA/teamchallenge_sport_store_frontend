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
