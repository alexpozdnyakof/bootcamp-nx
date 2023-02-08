import { ReactNode } from 'react'
import { Box } from '../box'
import { getClassNames } from '../responsive-props'
import { Space } from '../common-types'
import styles from './toolbar.module.less'

export interface ToolbarProps {
	children: ReactNode
	'data-testid'?: string
	size?: 'dense' | 'large'
	gutter?: Space
}

export function Toolbar({ children, size, gutter, ...props }: ToolbarProps) {
	return (
		<Box
			className={[
				styles['toolbar'],
				size !== null ? getClassNames(styles, 'size', size) : null,
				gutter !== null
					? getClassNames(styles, 'gutter', gutter)
					: null,
			]}
			{...props}
		>
			{children}
		</Box>
	)
}

export default Toolbar
