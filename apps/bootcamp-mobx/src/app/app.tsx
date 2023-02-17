import { Box } from '@bootcamp-nx/core-ui'
import { Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ProjectsPage, SignInPage, SignUpPage } from './pages'
import ProjectView from './pages/project-view'
import { AuthRouteGuard } from './route-guard'

const router = createBrowserRouter([
	{
		path: 'projects',
		element: (
			<AuthRouteGuard
				redirectUrl='/sign-in'
				prediction={isLoggedIn => !isLoggedIn}
			>
				<ProjectsPage />
			</AuthRouteGuard>
		),
		children: [
			{
				path: ':id',
				element: (
					<AuthRouteGuard
						redirectUrl='/sign-in'
						prediction={isLoggedIn => !isLoggedIn}
					>
						<ProjectView />
					</AuthRouteGuard>
				),
			},
		],
	},
	{
		path: '/',
		element: (
			<AuthRouteGuard
				redirectUrl='/projects'
				prediction={isLoggedIn => isLoggedIn}
			>
				<SignInPage />
			</AuthRouteGuard>
		),
	},
	{
		path: 'sign-in',
		element: (
			<AuthRouteGuard
				redirectUrl='/projects'
				prediction={isLoggedIn => isLoggedIn}
			>
				<SignInPage />
			</AuthRouteGuard>
		),
	},
	{
		path: 'sign-up',
		element: (
			<AuthRouteGuard
				redirectUrl='/projects'
				prediction={isLoggedIn => isLoggedIn}
			>
				<SignUpPage />,
			</AuthRouteGuard>
		),
	},
])

export function App() {
	return (
		<Box width='full' height='full'>
			<Suspense fallback={<Box>Loading ...</Box>}>
				<RouterProvider router={router} />
			</Suspense>
		</Box>
	)
}

export default App
