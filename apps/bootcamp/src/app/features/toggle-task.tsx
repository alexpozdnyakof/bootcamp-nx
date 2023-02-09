import { ApiTask } from '@bootcamp-nx/api-interfaces'
import { SwitchComplete } from '@bootcamp-nx/core-ui'
import { toggleTaskThunk } from '../slices/task.slice'
import { useAppDispatch } from '../store-hooks'

export function ToggleTask({
	done,
	id,
	title,
}: Pick<ApiTask, 'title' | 'id' | 'done'>) {
	const dispatch = useAppDispatch()

	return (
		<SwitchComplete
			done={done}
			aria-label={'Complete '.concat(title)}
			onClick={() => dispatch(toggleTaskThunk(id))}
		/>
	)
}
