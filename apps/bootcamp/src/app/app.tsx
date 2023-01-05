import { Box } from '@bootcamp-nx/core-ui'
import { ApiBootcamp } from '@bootcamp-nx/data-access-bootcamp'
import { Suspense, useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import styles from './app.module.less'
import { ProjectPage, projectLoader } from './pages/project'
import { projectSlice } from './slices'
import { useAppDispatch } from './store-hooks'
import { SideMenu, TopBar } from './widgets'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const itemsJp = [
	'ホームページのリニューアル',
	'チェックアウトフォームのリファクタリング',
	'実験プロジェクト',
	'ホームページのリニューアル',
	'チェックアウトフォームのリファクタリング',
	'実験プロジェクト',
]

const router = createBrowserRouter([
	{
		path: ':id',
		element: <ProjectPage />,
		loader: projectLoader,
	},
])

export default function App() {
	const api = ApiBootcamp()
	const dispatch = useAppDispatch()
	useEffect(() => {
		const fetchProjects = async () => {
			const projects = await api.Projects()
			dispatch(projectSlice.actions.setAll(projects))
		}

		fetchProjects()
	}, [api, dispatch])

	return (
		<>
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
								<RouterProvider router={router} />
							</Suspense>
						</Box>
					</Box>
				</Box>
			</Box>
		</>
	)
}
