import { ReactElement } from 'react'
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
	({ children, content, role = 'tooltip', ...props }, ref) => {
		const { anchor, position } = useTooltip(children)

		if (!children) return null

		return (
			<>
				{anchor}
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
