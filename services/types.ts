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
