import { NavItem } from '../../services/types'

export const NAV_ITEMS: NavItem[] = [
	{
		title: { key: 'men', label: 'Чоловіки', href: '/products?gender=men' },
		links: [
			{ key: 'sneakers', label: 'Кросівки', href: '/products/sneakers?gender=men&sub_category=sneakers' },
			{ key: 't-shirts', label: 'Футболки', href: '/products/t-shirts?gender=men&sub_category=t-shirts' },
			{ key: 'shorts', label: 'Шорти', href: '/products/shorts?gender=men&sub_category=shorts' },
			{
				key: 'pants',
				label: 'Штани',
				href: '/products/pants?gender=men&sub_category=pants',
			},
			{
				key: 'sweatshirts',
				label: 'Світшоти',
				href: '/products/sweatshirts?gender=men&sub_category=sweatshirts',
			},
			// { key: 'accessories', label: 'Аксесуари', href: '/men/accessories' },
			// {
			// 	key: 'responsive-products',
			// 	label: 'Адаптивні товари',
			// 	href: '/men/responsive-products',
			// 	links: [
			// 		{
			// 			key: 'clothes',
			// 			label: 'Одяг',
			// 			href: '/men/responsive-products/clothes',
			// 		},
			// 		{
			// 			key: 'shoes',
			// 			label: 'Взуття',
			// 			href: '/men/responsive-products/shoes',
			// 		},
			// 		{
			// 			key: 'sporting-goods',
			// 			label: 'Спортивні товари',
			// 			href: '/men/responsive-products/sporting-goods',
			// 		},
			// 	],
			// },
		],
	},
	{
		title: { key: 'women', label: 'Жінки', href: '/women' },
		links: [
			{ key: 'sneakers', label: 'Кросівки', href: '/products/sneakers?gender=women&sub_category=sneakers' },
			{ key: 't-shirts', label: 'Футболки', href: '/products/t-shirts?gender=women&sub_category=t-shirts' },
			{ key: 'shorts', label: 'Шорти', href: '/products/shorts?gender=women&sub_category=shorts' },
			{
				key: 'pants',
				label: 'Штани',
				href: '/products/pants?gender=women&sub_category=pants',
			},
			{
				key: 'sweatshirts',
				label: 'Світшоти',
				href: '/products/sweatshirts?gender=women&sub_category=sweatshirts',
			},
			// { key: 'accessories', label: 'Аксесуари', href: '/women/accessories' },
			// {
			// 	key: 'responsive-products',
			// 	label: 'Адаптивні товари',
			// 	href: '/women/responsive-products',
			// 	links: [
			// 		{
			// 			key: 'clothes',
			// 			label: 'Одяг',
			// 			href: '/women/responsive-products/clothes',
			// 		},
			// 		{
			// 			key: 'shoes',
			// 			label: 'Взуття',
			// 			href: '/women/responsive-products/shoes',
			// 		},
			// 		{
			// 			key: 'sporting-goods',
			// 			label: 'Спортивні товари',
			// 			href: '/women/responsive-products/sporting-goods',
			// 		},
			// 	],
			// },
		],
	},
	// {
	// 	title: {
	// 		key: 'brands',
	// 		label: 'Бренди',
	// 		href: '/brands',
	// 	},
	// 	links: [
	// 		{
	// 			key: 'adidas',
	// 			label: 'Adidas',
	// 			href: '/brands/adidas',
	// 		},
	// 		{ key: 'nike', label: 'Nike', href: '/brands/nike' },
	// 		{ key: 'tennis', label: 'Теніс', href: '/tennis' },
	// 		{
	// 			key: 'puma',
	// 			label: 'Puma',
	// 			href: '/brands/puma',
	// 		},
	// 		{ key: 'reebok', label: 'Reebok', href: '/brands/reebok' },
	// 	],
	// },
	// {
	// 	title: {
	// 		key: 'sports-activities',
	// 		label: 'Види спорту',
	// 		href: '/sport-activities',
	// 	},
	// 	links: [
	// 		{
	// 			key: 'running',
	// 			label: 'Біг',
	// 			href: '/running',
	// 			links: [
	// 				{
	// 					key: 'clothes',
	// 					label: 'Одяг',
	// 					href: '/running/clothes',
	// 				},
	// 				{ key: 'shoes', label: 'Взуття', href: '/running/shoes' },
	// 				{
	// 					key: 'sporting-goods',
	// 					label: 'Спортивні товари',
	// 					href: '/running/sporting-goods',
	// 				},
	// 			],
	// 		},
	// 		{ key: 'fitness', label: 'Фітнес', href: '/fitness' },
	// 		{ key: 'tennis', label: 'Теніс', href: '/tennis' },
	// 		{
	// 			key: 'football',
	// 			label: 'Футбол',
	// 			href: '/football',
	// 		},
	// 		{ key: 'basketball', label: 'Баскетбол', href: '/basketball' },
	// 		{
	// 			key: 'swimming',
	// 			label: 'Плавання',
	// 			href: '/swimming',
	// 		},
	// 		{
	// 			key: 'cycling',
	// 			label: 'Велоспорт',
	// 			href: '/cycling',
	// 		},
	// 	],
	// },
]
