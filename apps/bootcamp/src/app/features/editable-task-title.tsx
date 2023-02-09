import { ApiTask } from '@bootcamp-nx/api-interfaces'
import { EditableText } from '@bootcamp-nx/core-ui'
import { changeTaskTitleThunk } from '../slices/task.slice'
import { useAppDispatch } from '../store-hooks'

export function EditableTaskTitle({
	id,
	title,
}: Pick<ApiTask, 'id' | 'title'>) {
	const dispatch = useAppDispatch()
	return (
		<EditableText
			onChange={newText => {
				dispatch(changeTaskTitleThunk({ taskId: id, title: newText }))
			}}
			aria-label={`Edit ${title}`}
		>
			{title}
		</EditableText>
	)
}
