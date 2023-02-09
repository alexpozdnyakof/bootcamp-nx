import { Button } from '@bootcamp-nx/core-ui'
import { signOutThunk } from '../../slices/auth.slice'
import { useAppDispatch } from '../../store-hooks'

export default function LogoutButton() {
	const dispatch = useAppDispatch()
	return <Button onClick={() => dispatch(signOutThunk())}>ログアウト</Button>
}
