import { ApiTask } from '@bootcamp-nx/api-interfaces'
import { Button, Icon } from '@bootcamp-nx/core-ui'
import { useAppDispatch } from '../../store-hooks'
import { deleteTask } from './delete-task.actions'

export default function DeleteTask({
	id,
	title,
}: Pick<ApiTask, 'id' | 'title'>) {
	const dispatch = useAppDispatch()
	return (
		<Button
			size='small'
			variant='quaternary'
			onClick={() => dispatch(deleteTask({ id }))}
			aria-label={'Delete '.concat(title)}
			icon={<Icon size='small'>delete</Icon>}
		/>
	)
}
