import { AppBar, Box, Text, Toolbar, Userpic } from '@bootcamp-nx/core-ui'

import { ReactNode } from 'react'
import { LogoutButton } from '../process/auth'
import { selectUser } from '../slices/auth.slice'
import { useAppSelector } from '../store-hooks'
import { Search } from './search'

export type TopBarProps = {
	children: ReactNode | Array<ReactNode>
}

export function TopBar() {
	const currentUser = useAppSelector(selectUser)

	return (
		<AppBar position='fixed'>
			<Toolbar gutter='large' size='dense'>
				<Box>
					<Text size='subtitle' weight='bold' tone='positive'>
						見出し
					</Text>
				</Box>
				<Box
					width='full'
					flexGrow={1}
					display='flex'
					alignItems='center'
					justifyContent='center'
				>
					<Box paddingX='medium' width='medium'>
						{currentUser && <Search />}
					</Box>
				</Box>

				<Toolbar>
					{currentUser && (
						<>
							<Userpic
								size='s'
								user={{
									name: `${currentUser?.first_name} ${currentUser?.last_name}`,
									email: currentUser?.username ?? 'email',
								}}
							/>
							<Box marginRight='-small'>
								<LogoutButton />
							</Box>
						</>
					)}
				</Toolbar>
			</Toolbar>
		</AppBar>
	)
}

export default TopBar
