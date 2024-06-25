'use client'

import { HIDE_PAGE_PATH } from '@/services/hide-page-path.data'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

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

	return <footer className='p-8 mt-auto'>Footer</footer>
}

export default Footer
