import { ReactNode } from 'react'
import { Box } from '../box'
import { Inline } from '../inline'
import { polymorphicComponent } from '../polymorphic'
import styles from './list-item.module.less'

type ListItemProps = {
	children: ReactNode
	actions?: ReactNode | Array<ReactNode>
	hoverable?: boolean
}

const ListItem = polymorphicComponent<'div', ListItemProps>(
	({ children, actions, hoverable = true, ...props }, ref) => {
		return (
			<Box
				className={[
					styles['ListItem'],
					hoverable ? styles['listItem_hoverable'] : null,
				]}
				ref={ref}
				{...props}
			>
				<Box className={styles['ListItem-Content']}>{children}</Box>
				{actions ? (
					<Box className={styles['ListItem-Controls']}>
						<Inline>{actions}</Inline>
					</Box>
				) : null}
				<Box className={styles['listItem-surface']} />
			</Box>
		)
	}
)

export default ListItem
