import { ReactNode } from 'react'
import styles from './button.module.less'

/* eslint-disable-next-line */
export interface ButtonProps {
	children: ReactNode
}

export function Button({ children }: ButtonProps) {
	return <button className={styles['Button']}>{children}</button>
}

export default Button
