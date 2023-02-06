import { Box } from '../box'
import { Button } from '../button'
import { Text } from '../text'
import { Toolbar } from '../toolbar'
import AppBar from './app-bar'

export default {
	component: AppBar,
	title: 'AppBar',
}

export function Overview() {
	return (
		<AppBar>
			<Toolbar>
				<Text size='subtitle' weight='bold' tone='positive'>
					見出し
				</Text>
				<Box flexGrow={1} />
				<Button>ログアウト</Button>
			</Toolbar>
		</AppBar>
	)
}
