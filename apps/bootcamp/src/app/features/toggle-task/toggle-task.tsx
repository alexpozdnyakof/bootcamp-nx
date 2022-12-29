import { ApiTask } from '@bootcamp-nx/api-interfaces'
import { SwitchComplete } from '@bootcamp-nx/core-ui'
import { useAppDispatch } from '../../store-hooks'
import { toggleTask } from './toggle-task.actions'

export default function ToggleTask({
	done,
	id,
	title,
}: Pick<ApiTask, 'title' | 'id' | 'done'>) {
	const dispatch = useAppDispatch()

	return (
		<SwitchComplete
			done={done}
			aria-label={'Complete '.concat(title)}
			onClick={() => dispatch(toggleTask({ id }))}
		/>
	)
}
