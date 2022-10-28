import { ReactElement, ReactNode } from 'react'
import { Box } from '../box'
import { Inline } from '../inline'
import { Stack } from '../stack'
import styles from './list.module.less'

type ListItemProps = {
	children: ReactNode
	actions?: ReactNode | Array<ReactNode>
}

export function ListItem({ children, actions }: ListItemProps) {
	return (
		<Box className={styles['ListItem']}>
			<Box className={styles['ListItem-Content']}>{children}</Box>
			<Box className={styles['ListItem-Controls']}>
				<Inline>{actions}</Inline>
			</Box>
		</Box>
	)
}

/* eslint-disable-next-line */
export interface ListProps {
	children:
		| ReactElement<typeof ListItem>
		| Array<ReactElement<typeof ListItem>>
}

export function List({ children }: ListProps) {
	return (
		<Box className={styles['ListWrapper']}>
			<Stack>{children}</Stack>
		</Box>
	)
}

export default List
