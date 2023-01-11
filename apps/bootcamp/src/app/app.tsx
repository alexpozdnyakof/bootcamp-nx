import { Box } from '@bootcamp-nx/core-ui'
import { ApiBootcamp } from '@bootcamp-nx/data-access-bootcamp'
import { Suspense, useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import styles from './app.module.less'
import { projectLoader, ProjectPage } from './pages/project'
import { SignInPage } from './pages/sign-in'
import RouteGuard from './route-guard'
import { authSlice, projectSlice } from './slices'
import { useAppDispatch } from './store-hooks'
import { TopBar } from './widgets'

const router = createBrowserRouter([
	{
		path: ':id',
		element: (
			<RouteGuard>
				<ProjectPage />
			</RouteGuard>
		),
		loader: projectLoader,
	},
	{
		path: 'sign-in',
		element: <SignInPage />,
	},
])

export default function App() {
	const api = ApiBootcamp()
	const dispatch = useAppDispatch()

	useEffect(() => {
		const getUser = async () => {
			try {
				const user = await api.CurrentUser()

				dispatch(authSlice.actions.setUser(user))
			} catch (error) {
				console.log(error)
			}
		}

		const fetchProjects = async () => {
			const projects = await api.Projects()
			dispatch(projectSlice.actions.setAll(projects))
		}
		getUser()

		fetchProjects()
	}, [api, dispatch])

	return (
		<>
			<TopBar />
			<Box className={styles['app-layout']}>
				<Suspense fallback={<Box>Loading ...</Box>}>
					<RouterProvider router={router} />
				</Suspense>
			</Box>
		</>
	)
}
