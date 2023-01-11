import { ReactNode, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { selectUser } from './slices/auth.slice'
import { useAppSelector } from './store-hooks'

type RouteGuardProps = {
	children: ReactNode
}

export default function RouteGuard({ children }: RouteGuardProps) {
	const user = useAppSelector(selectUser)
	const navigate = useNavigate()

	useEffect(() => {
		if (!user) {
			navigate('/sign-in')
		}
	}, [user, navigate])

	return children ? <div>{children}</div> : <Outlet />
}
