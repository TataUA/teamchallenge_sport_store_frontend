'use client'

import { HIDE_PAGE_PATH } from '@/services/hide-page-path.data'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

// components
import InfoSectionFooter from './InfoSectionFooter'
import SubscribeBannerFooter from './SubscribeBannerFooter'

const Footer = () => {
	const pathname = usePathname()
	const [shouldHideFooter, setShouldHideFooter] = useState(false)

	useEffect(() => {
		console.log(pathname)
		const hidePath = HIDE_PAGE_PATH.map(page => page.path)
		setShouldHideFooter(hidePath.includes(pathname))
	}, [pathname])

	if (shouldHideFooter) {
		return null
	}

	return (
		<footer>
			<SubscribeBannerFooter />
			<div className='p-8 mt-auto max-[767px]:px-6 max-[767px]:py-5'>
				<InfoSectionFooter />
			</div>
		</footer>
	)
}

export default Footer