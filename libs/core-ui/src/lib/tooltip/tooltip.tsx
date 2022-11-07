import {
	cloneElement,
	MouseEvent,
	KeyboardEvent,
	ReactElement,
	useRef,
	useState,
} from 'react'
import { polymorphicComponent } from '../polymorphic'
import { Portal } from '../portal'
import styles from './tooltip.module.less'

type TooltipProps = {
	children: ReactElement
	content: string
}

/**
 *
 * @param props
 * @returns
 */

type Position = {
	x: number
	y: number
}
const Tooltip = polymorphicComponent<'div', TooltipProps>(
	({ children, content, role = 'tooltip', ...props }, ref) => {
		const [position, setPosition] = useState<Position | null>(null)
		const anchorState = useRef<'focus' | 'idle'>('idle')

		if (!children) return null

		const setTooltipPosition = (bounds: DOMRect) => {
			if (position !== null) return
			setPosition({
				x: bounds.x,
				y: bounds.y + bounds.height,
			})
		}
		const dropTooltipPosition = () => {
			if (position !== null) setPosition(null)
		}

		const onMouseOver = (event: MouseEvent<HTMLElement>) => {
			if (anchorState.current === 'focus') return
			const bounds = event.currentTarget.getBoundingClientRect()
			setTooltipPosition(bounds)
		}

		const onMouseOut = () => {
			if (anchorState.current === 'focus') return
			dropTooltipPosition()
		}

		const onFocus = (event: KeyboardEvent<HTMLElement>) => {
			anchorState.current = 'focus'
			const bounds = event.currentTarget.getBoundingClientRect()
			setTooltipPosition(bounds)
		}

		const onBlur = () => {
			anchorState.current = 'idle'
			dropTooltipPosition()
		}

		const withMouseListeners = cloneElement(children, {
			onMouseOver,
			onMouseOut,
			onFocus,
			onBlur,
		})

		return (
			<>
				{withMouseListeners}
				<Portal>
					{position && (
						<div
							role={role}
							className={styles['tooltip']}
							{...props}
							style={{
								left: position?.x,
								top: position?.y,
								position: 'fixed',
							}}
							ref={ref}
						>
							{content}
						</div>
					)}
				</Portal>
			</>
		)
	}
)

Tooltip.displayName = 'Tooltip'
export default Tooltip
