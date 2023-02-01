import { Box, Text } from '@bootcamp-nx/core-ui'
import { ReactNode } from 'react'
import { LogoutButton } from '../../process/auth'
import { selectUser } from '../../slices/auth.slice'
import { useAppSelector } from '../../store-hooks'
import styles from './top-bar.module.less'

export type TopBarProps = {
	children: ReactNode | Array<ReactNode>
}

export function TopBar() {
	const currentUser = useAppSelector(selectUser)

	return (
		<Box
			style={{ height: '48px' }}
			width='full'
			className={styles['app-header']}
			display='flex'
			alignItems='center'
			paddingX='medium'
		>
			<Text size='subtitle' weight='bold' tone='positive'>
				見出し
			</Text>
			<Box flexGrow={1} />
			{currentUser && <LogoutButton />}
		</Box>
	)
}

export default TopBar
