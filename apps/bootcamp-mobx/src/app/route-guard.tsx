import { Box } from '@bootcamp-nx/core-ui'
import { observer } from 'mobx-react-lite'
import { ReactNode, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from './stores'

type RouteGuardProps = {
	children: ReactNode
	redirectUrl: string
	prediction: (isLoggedIn: boolean) => boolean
}

export const AuthRouteGuard = observer(
	({ children, redirectUrl, prediction }: RouteGuardProps) => {
		const navigate = useNavigate()
		const { authStore } = useStore()

		useLayoutEffect(() => {
			if (prediction(authStore.isLoggedIn)) {
				navigate(redirectUrl)
			}
		}, [authStore.isLoggedIn, redirectUrl, navigate, prediction])

		return (
			<Box width='full' height='full' display='flex'>
				{children}
			</Box>
		)
	}
)
