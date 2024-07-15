import { NavItem } from '../../services/types'

export const NAV_ITEMS: NavItem[] = [
	{
		title: { key: 'men', label: 'Чоловіки', href: '/products?gender=men' },
		links: [
			{ key: 'sneakers', label: 'Кросівки', href: '/products/sneakers?gender=Чоловіки&productType=Кросівки' },
			{ key: 't-shirts', label: 'Футболки', href: '/products/t-shirts?gender=Чоловіки&productType=Футболки' },
			{ key: 'shorts', label: 'Шорти', href: '/products/shorts?gender=Чоловіки&productType=Шорти' },
			{
				key: 'pants',
				label: 'Штани',
				href: '/products/pants?gender=Чоловіки&productType=Штани',
			},
			{
				key: 'sweatshirts',
				label: 'Світшоти',
				href: '/products/sweatshirts?gender=Чоловіки&productType=Світшоти',
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
			{ key: 'sneakers', label: 'Кросівки', href: '/products/sneakers?gender=Жінки&productType=Кросівки' },
			{ key: 't-shirts', label: 'Футболки', href: '/products/t-shirts?gender=Жінки&productType=Футболки' },
			{ key: 'shorts', label: 'Шорти', href: '/products/shorts?gender=Жінки&productType=Шорти' },
			{
				key: 'pants',
				label: 'Штани',
				href: '/products/pants?gender=Жінки&productType=Штани',
			},
			{
				key: 'sweatshirts',
				label: 'Світшоти',
				href: '/products/sweatshirts?gender=Жінки&productType=Світшоти',
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
