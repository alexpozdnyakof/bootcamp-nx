import { ReactNode } from 'react'
import { Box } from '../box'
import { polymorphicComponent } from '../polymorphic'
import styles from './menu-item.module.less'

export interface MenuItemProps {
	children: ReactNode
	onClick?: () => void
	selected?: boolean
}

const MenuItem = polymorphicComponent<'div', MenuItemProps>(
	({ children, onClick, selected, ...props }, ref) => {
		return (
			<Box
				ref={ref}
				width='full'
				className={[
					styles['menu-item'],
					selected ? styles['menu-item_selected'] : null,
				]}
				onClick={onClick}
				role='menuitem'
				{...props}
			>
				{children}
			</Box>
		)
	}
)

MenuItem.displayName = 'MenuItem'

export default MenuItem
