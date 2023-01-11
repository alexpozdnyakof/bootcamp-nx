import { ApiUser } from '@bootcamp-nx/api-interfaces'
import { ReactNode, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { selectUser } from './slices/auth.slice'
import { useAppSelector } from './store-hooks'

type RouteGuardProps = {
	children: ReactNode
	redirectUrl: string
	canActivate: (user: ApiUser | null) => boolean
}

export default function RouteGuard({
	children,
	redirectUrl,
	canActivate,
}: RouteGuardProps) {
	const user = useAppSelector(selectUser)
	const navigate = useNavigate()
	useLayoutEffect(() => {
		if (canActivate(user)) {
			navigate(redirectUrl)
		}
	}, [user, navigate, redirectUrl, canActivate])

	return <div>{children}</div>
}
