import { ReactNode } from 'react'
import { Box } from '../box'
import { Inline } from '../inline'
import { polymorphicComponent } from '../polymorphic'
import styles from './list-item.module.less'

type ListItemProps = {
	children: ReactNode | Array<ReactNode>
	actions?: ReactNode | Array<ReactNode>
	hoverable?: boolean
	selected?: boolean
	startActions: ReactNode | Array<ReactNode>
}

const ListItem = polymorphicComponent<'div', ListItemProps>(
	(
		{
			children,
			actions,
			startActions,
			hoverable = true,
			selected = false,
			...props
		},
		ref
	) => {
		return (
			<Box
				role='listitem'
				className={[
					styles['listItem'],
					hoverable ? styles['listItem_hoverable'] : null,
					selected ? styles['listItem_selected'] : null,
				]}
				ref={ref}
				{...props}
			>
				<Box className={styles['listItem-startActions']}>
					{startActions}
				</Box>
				<Box className={styles['listItem-content']}>{children}</Box>
				{actions ? (
					<Box className={styles['listItem-controls']}>
						<Inline>{actions}</Inline>
					</Box>
				) : null}
				<Box className={styles['listItem-surface']} />
			</Box>
		)
	}
)

export default ListItem
