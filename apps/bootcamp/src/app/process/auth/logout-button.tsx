import { Button } from '@bootcamp-nx/core-ui'
import { useAppDispatch } from '../../store-hooks'
import { logout } from './auth-actions'

export default function LogoutButton() {
	const dispatch = useAppDispatch()
	return <Button onClick={() => dispatch(logout())}>ログアウト</Button>
}
