import { RefObject, useEffect } from 'react'

export function useOutsideClick(
	ref: RefObject<HTMLElement>,
	callback: () => void
): void {
	useEffect(() => {
		const onClick = (event: MouseEvent) => {
			if (
				ref.current &&
				event.target &&
				!ref.current.contains(event.target as Node)
			) {
				callback()
			}
		}

		document.addEventListener('mousedown', onClick)
		return () => {
			document.removeEventListener('mousedown', onClick)
		}
	}, [ref, callback])
}

export default useOutsideClick
