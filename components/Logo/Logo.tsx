import Image from 'next/image'
import Link from 'next/link'
import logoIcon from '../../public/icons/Logo.svg'

interface LogoProps {
	newStyle?: string
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
