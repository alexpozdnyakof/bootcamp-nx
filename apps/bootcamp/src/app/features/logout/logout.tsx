import { Button } from '@bootcamp-nx/core-ui'
import { useAppDispatch } from '../../store-hooks'
import { logout } from './logout.action'

/**
 * - [ ] run logout action
 * - [ ] run logout saga
 * - [ ] if success it must clean auth slice
 */

export default function Logout() {
	const dispatch = useAppDispatch()
	return <Button onClick={() => dispatch(logout())}>ログアウト</Button>
}
