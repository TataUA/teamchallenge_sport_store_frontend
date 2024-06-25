'use client'

import { SvgProps } from '@/services/types'

const SvgComponent = ({
	path,
	viewBox,
	fill = '#3E3E40',
	fillHovered = '#868687',
	isHovered,
}: SvgProps) => {
	return (
		<svg
			className='w-6 h-6'
			viewBox={viewBox}
			fill={!isHovered ? fill : fillHovered}
			xmlns='http://www.w3.org/2000/svg'
		>
			<path d={path} />
		</svg>
	)
}

export default SvgComponent
