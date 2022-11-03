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

const Tooltip = polymorphicComponent<'div', TooltipProps>(
	({ children, ...props }) => {
		const [visible, setVisible] = useState<boolean>(false)
		if (!children) return null
		const onMouseOver = (e: MouseEvent) => {
			setVisible(true)
		}
		const onMouseOut = (e: MouseEvent) => {
			setVisible(false)
		}

		const withMouseListeners = cloneElement(children, {
			onMouseOver,
			onMouseOut,
		})

		return (
			<>
				{withMouseListeners}
				<Portal>
					{visible && (
						<Box className={styles['container']} {...props}>
							Welcome to Tooltip!
						</Box>
					)}
				</Portal>
			</>
		)
	}
)

Tooltip.displayName = 'Tooltip'
export default Tooltip
