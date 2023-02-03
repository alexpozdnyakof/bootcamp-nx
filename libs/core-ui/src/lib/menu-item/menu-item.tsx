import { ReactNode } from 'react'
import { Box } from '../box'
import styles from './menu-item.module.less'

/* eslint-disable-next-line */
export interface MenuItemProps {
	children: ReactNode
	onClick?: () => void
}

export function MenuItem({ children, onClick }: MenuItemProps) {
	return (
		<Box width='full' className={styles['menu-item']} onClick={onClick}>
			{children}
		</Box>
	)
}

export default MenuItem
