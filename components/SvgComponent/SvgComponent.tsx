'use client'

import { SvgProps } from '@/services/types'
import { cn } from '@/services/utils/cn'

const SvgComponent = ({
	path,
	viewBox,
	fill = '#3E3E40',
	fillHovered = '#868687',
	isHovered,
	stroke,
	strokeHovered,
	classname = '',
}: SvgProps) => {
	return (
		<svg
			className={cn('w-6 h-6', classname)}
			viewBox={viewBox}
			fill={!isHovered ? fill : fillHovered}
			stroke={!isHovered ? stroke : strokeHovered}
			xmlns='http://www.w3.org/2000/svg'
		>
			<path d={path} />
		</svg>
	)
}

export default SvgComponent
