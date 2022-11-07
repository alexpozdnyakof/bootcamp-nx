import { ReactElement } from 'react'
import { Box } from '../box'
import { Position } from '../common-types'
import { polymorphicComponent } from '../polymorphic'
import { Portal } from '../portal'
import styles from './tooltip.module.less'
import useTooltip from './use-tooltip'

type TooltipElementProps = {
	position: Position
	children: string
}

const TooltipElement = polymorphicComponent<'div', TooltipElementProps>(
	({ position, children, ...props }, ref) => {
		return (
			<Box
				role='tooltip'
				className={styles['tooltip']}
				{...props}
				style={{
					left: position?.x,
					top: position?.y,
				}}
				ref={ref}
			>
				{children}
			</Box>
		)
	}
)

type TooltipProps = {
	children: ReactElement
	content: string
}

/**
 *
 * @param props
 * @returns
 */

const Tooltip = polymorphicComponent<'div', TooltipProps>(
	({ children, content, ...props }, ref) => {
		const { anchor, position } = useTooltip(children)

		if (!children) return null

		return (
			<>
				{anchor}
				<Portal>
					{position && (
						<TooltipElement
							ref={ref}
							position={position}
							{...props}
						>
							{content}
						</TooltipElement>
					)}
				</Portal>
			</>
		)
	}
)

Tooltip.displayName = 'Tooltip'
export default Tooltip
