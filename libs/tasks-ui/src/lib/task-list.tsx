import { List, Stack } from '@bootcamp-nx/core-ui'
import { useTaskListState } from './task-list-context'
import TaskFormExpandView from './task-form-expand-view'
import TaskListHeader from './task-list-header'
import TaskListItem from './task-list-item'

export function TaskList() {
	const {
		tasks,
		title,
		onDelete,
		onComplete,
		onCreate,
		onChange,
		completedCount,
	} = useTaskListState()

	return (
		<Stack space='large'>
			<Stack space='small'>
				<TaskListHeader completed={completedCount}>
					{title}
				</TaskListHeader>
				<TaskFormExpandView onSubmit={onCreate} />
			</Stack>

			<List>
				{tasks.map(task => (
					<TaskListItem
						key={task.id}
						task={task}
						onDelete={onDelete}
						onComplete={onComplete}
						onChange={onChange}
					/>
				))}
			</List>
		</Stack>
	)
}

export default TaskList
