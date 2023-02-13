import { ApiTask } from '@bootcamp-nx/api-interfaces'
import { Button, Icon } from '@bootcamp-nx/core-ui'
import { useDeleteTaskMutation } from '../slices/api.slice'

export function DeleteTask({ id, ...props }: Pick<ApiTask, 'id'>) {
	const [deleteTask] = useDeleteTaskMutation()

	return (
		<Button
			size='small'
			variant='quaternary'
			onClick={() => deleteTask(id)}
			icon={<Icon size='small'>delete</Icon>}
			{...props}
		/>
	)
}
