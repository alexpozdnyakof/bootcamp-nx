import { AppBar, Box, Text, Toolbar } from '@bootcamp-nx/core-ui'
import { ReactNode } from 'react'
import { LogoutButton } from '../process/auth'
import { selectUser } from '../slices/auth.slice'
import { useAppSelector } from '../store-hooks'

export type TopBarProps = {
	children: ReactNode | Array<ReactNode>
}

export function TopBar() {
	const currentUser = useAppSelector(selectUser)

	return (
		<AppBar>
			<Toolbar>
				<Text size='subtitle' weight='bold' tone='positive'>
					見出し
				</Text>
				<Box flexGrow={1} />
				{currentUser && <LogoutButton />}
			</Toolbar>
		</AppBar>
	)
}

export default TopBar
