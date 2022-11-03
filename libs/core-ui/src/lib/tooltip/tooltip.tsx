import { cloneElement, MouseEvent, ReactElement, useState } from 'react'
import { Box } from '../box'
import { polymorphicComponent } from '../polymorphic'
import { Portal } from '../portal'
import styles from './tooltip.module.less'

type TooltipProps = {
	children: ReactElement
}

/**
 *
 * TODO: wrap children
 * TODO: set listeners for mouse
 * TODO: show or hide tooltip
 * @param props
 * @returns
 */

type Position = {
	x: number
	y: number
}
const Tooltip = polymorphicComponent<'div', TooltipProps>(
	({ children, ...props }, ref) => {
		const [position, setPosition] = useState<Position | null>(null)

		if (!children) return null

		const onMouseOver = (event: MouseEvent<HTMLElement>) => {
			const bounds = event.currentTarget.getBoundingClientRect()
			setPosition({
				x: bounds.x,
				y: bounds.y + bounds.height,
			})
		}

		const onMouseOut = () => {
			setPosition(null)
		}

		const withMouseListeners = cloneElement(children, {
			onMouseOver,
			onMouseOut,
		})

		return (
			<>
				{withMouseListeners}
				<Portal>
					{position && (
						<div
							className={styles['tooltip']}
							{...props}
							style={{
								left: position?.x,
								top: position?.y,
								position: 'fixed',
							}}
							ref={ref}
						>
							Welcome to Tooltip!
						</div>
					)}
				</Portal>
			</>
		)
	}
)

Tooltip.displayName = 'Tooltip'
export default Tooltip
