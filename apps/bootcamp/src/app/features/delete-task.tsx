import { ApiTask } from '@bootcamp-nx/api-interfaces'
import { Button, Icon } from '@bootcamp-nx/core-ui'
import { deleteTaskThunk } from '../slices/task.slice'
import { useAppDispatch } from '../store-hooks'

export function DeleteTask({ id, title }: Pick<ApiTask, 'id' | 'title'>) {
	const dispatch = useAppDispatch()
	return (
		<Button
			size='small'
			variant='quaternary'
			onClick={() => dispatch(deleteTaskThunk(id))}
			aria-label={'Delete '.concat(title)}
			icon={<Icon size='small'>delete</Icon>}
		/>
	)
}
