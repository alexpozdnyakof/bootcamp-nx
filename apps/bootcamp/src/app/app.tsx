import { Box } from '@bootcamp-nx/core-ui'
import { Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import useInit from './init'
import { SignInPage, SignUpPage } from './pages'
import ProjectsPage, { ProjectView } from './pages/projects-page'
import RouteGuard from './route-guard'
import { TopBar } from './widgets'

const router = createBrowserRouter([
	{
		path: 'projects',
		element: (
			<RouteGuard
				redirectUrl='/sign-in'
				canActivate={user => user === null}
			>
				<ProjectsPage />
			</RouteGuard>
		),
		children: [
			{
				path: ':id',
				element: <ProjectView />,
			},
		],
	},
	{
		path: '/',
		element: (
			<RouteGuard
				redirectUrl='/projects'
				canActivate={user => user !== null}
			>
				<SignInPage />
			</RouteGuard>
		),
	},
	{
		path: 'sign-in',
		element: (
			<RouteGuard
				redirectUrl='/projects'
				canActivate={user => user !== null}
			>
				<SignInPage />
			</RouteGuard>
		),
	},
	{
		path: 'sign-up',
		element: (
			<RouteGuard
				redirectUrl='/projects'
				canActivate={user => user !== null}
			>
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
			<Box width='full' height='full'>
				<Suspense fallback={<Box>Loading ...</Box>}>
					<RouterProvider router={router} />
				</Suspense>
			</Box>
		</>
	)
}
