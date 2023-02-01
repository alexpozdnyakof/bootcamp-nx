import { Box } from '@bootcamp-nx/core-ui'
import { Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import styles from './app.module.less'
import useInit from './init'
import { SignInPage, SignUpPage } from './pages'
import { projectLoader, ProjectPage } from './pages/project'
import RouteGuard from './route-guard'
import { TopBar } from './widgets'

const router = createBrowserRouter([
	{
		path: ':id',
		element: (
			<RouteGuard
				redirectUrl='/sign-in'
				canActivate={user => user === null}
			>
				<ProjectPage />
			</RouteGuard>
		),
		loader: projectLoader,
	},
	{
		path: 'sign-in',
		element: (
			<RouteGuard redirectUrl='/1' canActivate={user => user !== null}>
				<SignInPage />
			</RouteGuard>
		),
	},
	{
		path: 'sign-up',
		element: (
			<RouteGuard redirectUrl='/1' canActivate={user => user !== null}>
				<SignUpPage />
			</RouteGuard>
		),
	},
])

export default function App() {
	useInit()

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
