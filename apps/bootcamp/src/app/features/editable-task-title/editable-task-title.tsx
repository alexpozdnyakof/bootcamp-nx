import { ApiTask } from '@bootcamp-nx/api-interfaces'
import { EditableText } from '@bootcamp-nx/core-ui'
import { useAppDispatch } from '../../store-hooks'
import { changeTaskTitle } from './editable-task-title.actions'

export default function EditableTaskTitle({
	id,
	title,
}: Pick<ApiTask, 'id' | 'title'>) {
	const dispatch = useAppDispatch()
	return (
		<EditableText
			onChange={newText => {
				dispatch(changeTaskTitle({ id, title: newText }))
			}}
			aria-label={`Edit ${title}`}
		>
			{title}
		</EditableText>
	)
}
