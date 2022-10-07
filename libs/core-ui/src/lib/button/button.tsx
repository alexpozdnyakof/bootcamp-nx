import { ReactNode } from 'react'

import { Box } from '../box'
import styles from './button.module.less'

/* eslint-disable-next-line */
export interface ButtonProps {
	children: ReactNode
}

export function Button({ children }: ButtonProps) {
	return (
		<Box as='button' className={styles['Button']}>
			{children}
		</Box>
	)
}

export default Button
