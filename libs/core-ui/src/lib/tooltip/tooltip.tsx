import { ReactElement } from 'react'
import { Box } from '../box'
import { polymorphicComponent } from '../polymorphic'
import { Portal } from '../portal'
import styles from './tooltip.module.less'
import useTooltip from './use-tooltip'

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
							{content}
						</Box>
					)}
				</Portal>
			</>
		)
	}
)

Tooltip.displayName = 'Tooltip'
export default Tooltip
