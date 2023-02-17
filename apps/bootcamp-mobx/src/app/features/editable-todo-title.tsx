import { ApiTask } from '@bootcamp-nx/api-interfaces'
import { EditableText } from '@bootcamp-nx/core-ui'
import { observer } from 'mobx-react-lite'
import { useStore } from '../stores'

const EditableTodoTitle = observer(
	({ id, title }: Pick<ApiTask, 'id' | 'title'>) => {
		const { todoStore } = useStore()

		return (
			<EditableText
				onChange={newText => {
					todoStore.changeTitle({ id, title: newText })
				}}
				aria-label={`Edit ${title}`}
			>
				{title}
			</EditableText>
		)
	}
)

export default EditableTodoTitle
