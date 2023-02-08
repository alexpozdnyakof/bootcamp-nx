import { ReactNode } from 'react'
import { Box } from '../box'
import styles from './drawer.module.less'

type DrawerProps = {
	children?: ReactNode
}

export default function Drawer({ children }: DrawerProps) {
	return (
		<Box className={styles['drawer']}>
			{children}
			<Box className={styles['drawer-stretch']} />
		</Box>
	)
}
