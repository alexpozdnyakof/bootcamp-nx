import { Heading, List, Stack, Text } from '@bootcamp-nx/core-ui'
import { TaskForm } from '../task-form'
import TaskListItem, { TaskListItemHandlers } from './task-list-item'
import { ViewTask } from './view-task'

type TaskListProps = {
	tasks: Array<ViewTask>
	title: string
	completedCount?: string
	editingTask?: ViewTask['id'] | null
	onCreate?: (text: ViewTask['text']) => void
} & TaskListItemHandlers

export function TaskList({
	tasks,
	title,
	onDelete,
	onComplete,
	onCreate,
	onChange,
	onStartEdit,
	onCancelEdit,
	editingTask,
	completedCount,
}: TaskListProps) {
	return (
		<Stack space='large'>
			<Stack space='xsmall'>
				{completedCount && (
					<Text size='caption' tone='secondary' weight='bold'>
						{completedCount} タスク完了
					</Text>
				)}
				<Heading level='2' size='larger'>
					{title}
				</Heading>
				<TaskForm onCreate={onCreate} />
			</Stack>
			<List>
				{tasks.map(task => (
					<TaskListItem
						key={task.id}
						task={task}
						onDelete={onDelete}
						onComplete={onComplete}
						onStartEdit={onStartEdit}
						isEditing={editingTask === task.id}
						onCancelEdit={onCancelEdit}
						onChange={onChange}
					/>
				))}
			</List>
		</Stack>
	)
}

export default TaskList
