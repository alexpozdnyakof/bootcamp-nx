import { List, Stack } from '@bootcamp-nx/core-ui'
import {
	TaskFormExpandView,
	TaskListHeader,
	TaskListItem,
} from '@bootcamp-nx/tasks-ui'
import { useAppSelector } from '../../store-hooks'
import { getTasksRelatedToTasklist } from './task-list.selector'

type TaskListProps = {
	type: 'task_list'
	id: number
	title: string
	onCreate: (title: string) => void
	onTaskComplete: (id: number) => void
	onTaskDelete: (id: number) => void
	onChangeTaskTitle: (id: number, title: string) => void
}

export default function TaskList({
	type,
	id: _listId,
	title: _listTitle,
	onCreate,
	onTaskComplete,
	onTaskDelete,
	onChangeTaskTitle,
}: TaskListProps) {
	const tasks = useAppSelector(state =>
		getTasksRelatedToTasklist(state, _listId)
	)

	return (
		<Stack space='large' key={`${type}-${_listId}`}>
			<Stack space='small'>
				<TaskListHeader completed='0/5'>{_listTitle}</TaskListHeader>
				<TaskFormExpandView
					onSubmit={(title: string) => onCreate(title)}
				/>
			</Stack>
			<List>
				{tasks.map(task => (
					<TaskListItem
						key={task.id}
						task={task}
						onDelete={onTaskDelete}
						onComplete={onTaskComplete}
						onChange={onChangeTaskTitle}
					/>
				))}
			</List>
		</Stack>
	)
}

export { TaskList }
