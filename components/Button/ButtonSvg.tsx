'use client'

import { iconsData } from '@/constants'
import { useState } from 'react'
import SvgComponent from '../SvgComponent/SvgComponent'

interface ButtonSvgProps {
	type: 'button' | 'submit' | 'reset'
	nameSvg: string
	fill?: string
	fillHovered?: string
	stroke?: string
	strokeHovered?: string
	onClick?: () => void
	className?: string
}

const ButtonSvg = ({
	type,
	nameSvg,
	fill,
	fillHovered,
	stroke,
	strokeHovered,
	onClick,
	className,
}: ButtonSvgProps) => {
	const [isHovered, setIsHovered] = useState('')

	return (
		<button
			className={className}
			key={nameSvg}
			onMouseEnter={() => setIsHovered(nameSvg)}
			onMouseLeave={() => setIsHovered('')}
			type={type}
			onClick={onClick}
		>
			{iconsData.map(
				icon =>
					icon.name === nameSvg && (
						<SvgComponent
							key={icon.name}
							viewBox={icon.viewBox}
							path={icon.path}
							stroke={stroke}
							strokeHovered={strokeHovered}
							fill={fill}
							fillHovered={fillHovered}
							isHovered={isHovered === nameSvg}
						/>
					)
			)}
		</button>
	)
}

export default ButtonSvg
