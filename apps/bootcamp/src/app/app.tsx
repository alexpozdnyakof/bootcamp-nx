import { Box } from '@bootcamp-nx/core-ui'
import { Suspense } from 'react'
import { Provider } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import styles from './app.module.less'
import SideMenu from './features/side-menu/side-menu'
import { TopBar } from './features/top-bar/top-bar'
import ProjectPage from './pages/project'

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

export default function App() {
	return (
		<Provider store={store}>
			<TopBar />
			<Box className={styles['app-layout']}>
				<Box className={styles['app-menu']}>
					<Box style={{ height: '24px' }} />
					<SideMenu />
				</Box>
				<Box>
					<Box className={styles['app-layout-content']}>
						<Box className={styles['app-tasklists']}>
							<Suspense fallback={<Box>Loading ...</Box>}>
								<Routes>
									<Route
										path=':id'
										element={<ProjectPage />}
									/>
								</Routes>
							</Suspense>
						</Box>
					</Box>
				</Box>
			</Box>
		</Provider>
	)
}
