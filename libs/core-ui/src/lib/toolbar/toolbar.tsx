import { ReactNode } from 'react'
import { Box } from '../box'
import styles from './toolbar.module.less'

export interface ToolbarProps {
	children: ReactNode
	dense?: boolean
	'data-testid'?: string
}

export function Toolbar({ children, dense, ...props }: ToolbarProps) {
	return (
		<Box
			className={[
				styles['toolbar'],
				dense ? styles['toolbar_dense'] : null,
			]}
			{...props}
		>
			{children}
		</Box>
	)
}

export default Toolbar
