import { Button, Icon, Inline, List, Stack, Text } from '@bootcamp-nx/core-ui'
import { ViewTask } from '../common-types'
import { TaskForm } from '../task-form'
import { useTaskListState } from '../task-list-context'
import { TaskListItem, TaskListItemHandlers } from '../task-list-item'

type TaskListProps = {
	tasks?: Array<ViewTask>
	title?: string
	completedCount?: string
	editingTask?: ViewTask['id'] | null
	onCreate?: (text: ViewTask['text']) => void
} & TaskListItemHandlers

export function TaskList(props: TaskListProps) {
	const {
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
	} = useTaskListState()

	return (
		<Stack space='large'>
			<Stack space='small'>
				<Stack>
					{completedCount && (
						<Text size='caption' tone='secondary' weight='bold'>
							{completedCount} タスク完了
						</Text>
					)}
					<Inline width='full' alignY='center'>
						<Text size='subtitle' weight='bold'>
							{title}
						</Text>
						<Button
							size='small'
							variant='quaternary'
							icon={<Icon size='small'>more_horiz</Icon>}
						/>
					</Inline>
				</Stack>
				<TaskForm onSubmit={onCreate} />
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
