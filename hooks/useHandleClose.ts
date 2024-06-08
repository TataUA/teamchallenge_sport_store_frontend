import { MouseEventHandler } from 'react'

const useHandleClose = (onClose: () => void) => {
	const handleClose: MouseEventHandler<HTMLAnchorElement> = e => {
		e.preventDefault()
		onClose()
	}

	return handleClose
}

export default useHandleClose
