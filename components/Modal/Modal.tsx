import useHandleClose from '@/hooks/useHandleClose'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import closeIcon from '../../public/icons/header/close.svg'
import { Logo } from '../Logo/Logo'

interface ModalProps {
	show: boolean
	onClose: () => void
	children: React.ReactNode
}

export const Modal = ({ show, onClose, children }: ModalProps) => {
	const handleClose = useHandleClose(onClose)
	const [isBrowser, setIsBrowser] = useState(false)
	const modalRef = useRef<HTMLDivElement>(null)
	useEffect(() => {
		setIsBrowser(true)
	}, [])
	useEffect(() => {
		if (isBrowser && show) {
			document.addEventListener('keydown', handleKeyDown)
			document.addEventListener('mousedown', handleClickOutside)
			document.body.style.overflow = 'hidden'
			return () => {
				document.removeEventListener('keydown', handleKeyDown)
				document.removeEventListener('mousedown', handleClickOutside)
				if(document.body.style.overflow === 'hidden') document.body.style.overflow = 'auto'
			}
		}
	}, [isBrowser, show])

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			onClose()
		}
	}

	const handleClickOutside = (e: MouseEvent) => {
		if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
			onClose()
		}
	}

	const modalContent = show ? (
		<>
			<div className='fixed top-0 left-0 w-full h-full bg-white z-20'>
				<div
					ref={modalRef}
					className='container max-w-full max-h-full bg-white'
				>
					<div className='relative py-3 mb-4 flex justify-between items-center'>
						<div
							className='absolute left-1/2 transform -translate-x-1/2 cursor-pointer'
							onClick={onClose}
						>
							<Logo />
						</div>
						<a href='#' onClick={handleClose} className='ml-auto'>
							<button className='flex'>
								<Image src={closeIcon} alt='close' width={40} height={40} />
							</button>
						</a>
					</div>
					<div>{children}</div>
				</div>
			</div>
		</>
	) : null

	if (isBrowser) {
		const modalRoot = document.getElementById('modal-root')
		return modalRoot ? ReactDOM.createPortal(modalContent, modalRoot) : null
	} else {
		return null
	}
}
