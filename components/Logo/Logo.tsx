import Image from 'next/image'
import Link from 'next/link'
import logoIcon from '../../public/icons/header/Logo.svg'

interface LogoProps {
	newStyle?: string
	onClick?: () => void
}

export const Logo = ({ newStyle }: LogoProps) => {
	return (
		<Link href='/'>
			<Image
				src={logoIcon}
				width={140}
				height={14}
				alt='Logo'
				className={`${newStyle}`}
			/>
		</Link>
	)
}
