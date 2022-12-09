import { Box, Stack, Text } from '@bootcamp-nx/core-ui'
import { TaskList, TaskListProvider } from '@bootcamp-nx/tasks-ui'
import { Provider } from 'react-redux'
import styles from './app.module.less'
import SideMenu from './features/side-menu/side-menu'
import store from './store'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const itemsJp = [
	'ホームページのリニューアル',
	'チェックアウトフォームのリファクタリング',
	'実験プロジェクト',
	'ホームページのリニューアル',
	'チェックアウトフォームのリファクタリング',
	'実験プロジェクト',
]

export const TASKS_DATA = [
	{
		id: 0,
		text: '血液レポートのグラフが空白になっている',
		done: false,
	},
	{
		id: 1,
		text: '無効にする|| ユーザーがアカウントを無効にできない',
		done: true,
	},
	{
		id: 2,
		text: '|| 私のプロフィール || ユーザーは、サインアップ時に設定された体重と身長を表示できません',
		done: false,
	},
	{
		id: 3,
		text: 'プロフィール、プロフィールの編集、ポップアップ',
		done: true,
	},
	{
		id: 4,
		text: 'ビルドを共有するには Apple 開発者アカウントが必要です',
		done: false,
	},
]

export default function App() {
	return (
		<Provider store={store}>
			<Box
				style={{ height: '48px' }}
				width='full'
				className={styles['app-header']}
			>
				<Text size='subtitle' weight='bold' tone='positive'>
					見出し
				</Text>
			</Box>
			<Box className={styles['app-layout']}>
				<Box className={styles['app-menu']}>
					<Box style={{ height: '24px' }} />
					<SideMenu />
				</Box>
				<Box>
					<Box className={styles['app-layout-content']}>
						<Box className={styles['app-tasklists']}>
							<Stack space='xlarge'>
								<TaskListProvider
									tasks={TASKS_DATA}
									title='素晴らしいタスクリスト'
								>
									<TaskList />
								</TaskListProvider>
								<TaskListProvider
									tasks={TASKS_DATA}
									title='素晴らしいタスクリスト'
								>
									<TaskList />
								</TaskListProvider>
							</Stack>
						</Box>
					</Box>
				</Box>
			</Box>
		</Provider>
	)
}
