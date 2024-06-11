'use client'

import { Header } from '@/components/Header/Header'
import { usePathname } from 'next/navigation'
import React from 'react'

interface ClientRootLayoutProps {
	children: React.ReactNode
}

const HIDE_FOOTER_PATHS = ['/cart']

const ClientRootLayout: React.FC<ClientRootLayoutProps> = ({ children }) => {
	const pathname = usePathname()
	const shouldHideFooter = HIDE_FOOTER_PATHS.includes(pathname)

	return (
		<>
			<Header />
			<main className='relative flex-1'>{children}</main>
			{!shouldHideFooter && <footer className='p-8 mt-auto'>Footer</footer>}
			<div id='modal-root'></div>
		</>
	)
}

export default ClientRootLayout
