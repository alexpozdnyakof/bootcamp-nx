import { Box, Text } from '@bootcamp-nx/core-ui'
import styles from './top-bar.module.less'

/* eslint-disable-next-line */
export interface TopBarProps {}

export function TopBar() {
	return (
		<Box
			style={{ height: '48px' }}
			width='full'
			className={styles['app-header']}
		>
			<Text size='subtitle' weight='bold' tone='positive'>
				見出し
			</Text>
		</Box>
	)
}

export default TopBar
