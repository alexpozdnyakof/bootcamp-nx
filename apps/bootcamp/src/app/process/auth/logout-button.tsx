import { Button, Icon } from '@bootcamp-nx/core-ui'
import { signOutThunk } from '../../slices/auth.slice'
import { useAppDispatch } from '../../store-hooks'

export default function LogoutButton() {
	const dispatch = useAppDispatch()

	return (
		<Button
			onClick={() => dispatch(signOutThunk())}
			variant='quaternary'
			size='small'
		>
			<Icon size='small'>logout</Icon>
		</Button>
	)
}
