import {
	ReactElement,
	useRef,
	useState,
	MouseEvent,
	KeyboardEvent,
	cloneElement,
} from 'react'
import { Position } from '../common-types'

export interface UseTooltip {
	anchor: ReactElement
	position: Position | null
}

export function useTooltip(element: ReactElement | undefined): UseTooltip {
	const [position, _setPosition] = useState<UseTooltip['position']>(null)
	const state = useRef<'focus' | 'idle'>('idle')

	if (!element) throw new Error('Tooltip anchor element is not defined')

	const setPosition = (bounds: DOMRect | null) => {
		if (bounds !== null && position == null) {
			_setPosition({
				x: bounds.x,
				y: bounds.y + bounds.height,
			})
		}

		if (bounds === null && position !== null) _setPosition(null)
	}

	const getBounds = (
		event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>
	) => event.currentTarget.getBoundingClientRect()

	const listeners = {
		onMouseOver: (event: MouseEvent<HTMLElement>) => {
			if (state.current !== 'focus') {
				setPosition(getBounds(event))
			}
		},
		onMouseOut: () => {
			if (state.current !== 'focus') {
				setPosition(null)
			}
		},
		onFocus: (event: KeyboardEvent<HTMLElement>) => {
			state.current = 'focus'
			setPosition(getBounds(event))
		},
		onBlur: () => {
			state.current = 'idle'
			setPosition(null)
		},
	}

	return {
		anchor: cloneElement(element, listeners),
		position,
	}
}

export default useTooltip
