import { Button, ExpandView } from '@bootcamp-nx/core-ui'
import TaskForm, { TaskFormProps } from './task-form/task-form'

export default function TaskFormExpandView({
	onSubmit,
}: Pick<TaskFormProps, 'onSubmit'>) {
	return (
		<ExpandView>
			{(toggleExpand, expanded) => (
				<>
					{!expanded && (
						<Button onClick={toggleExpand}>タスクを作成</Button>
					)}
					{expanded && (
						<TaskForm onSubmit={onSubmit} onClear={toggleExpand} />
					)}
				</>
			)}
		</ExpandView>
	)
}
