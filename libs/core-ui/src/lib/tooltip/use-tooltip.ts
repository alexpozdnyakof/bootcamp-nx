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
	const setPosition = (bounds: DOMRect) => {
		if (position == null) {
			_setPosition({
				x: bounds.x,
				y: bounds.y + bounds.height,
			})
		}
	}

	const dropPosition = () => {
		if (position !== null) _setPosition(null)
	}

	const onMouseOver = (event: MouseEvent<HTMLElement>) => {
		if (state.current === 'focus') return
		const bounds = event.currentTarget.getBoundingClientRect()
		setPosition(bounds)
	}

	const onMouseOut = () => {
		if (state.current === 'focus') return
		dropPosition()
	}

	const onFocus = (event: KeyboardEvent<HTMLElement>) => {
		state.current = 'focus'
		const bounds = event.currentTarget.getBoundingClientRect()
		setPosition(bounds)
	}

	const onBlur = () => {
		state.current = 'idle'
		dropPosition()
	}

	return {
		anchor: cloneElement(element, {
			onMouseOver,
			onMouseOut,
			onFocus,
			onBlur,
		}),
		position,
	}
}

export default useTooltip
