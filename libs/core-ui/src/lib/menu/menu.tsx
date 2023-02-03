import { ReactNode } from 'react'
import { Stack } from '../stack'
import styles from './menu.module.less'

/* eslint-disable-next-line */
export interface MenuProps {
	children: ReactNode
}

export function Menu({ children }: MenuProps) {
	return <Stack role='menu'>{children}</Stack>
}

export default Menu
