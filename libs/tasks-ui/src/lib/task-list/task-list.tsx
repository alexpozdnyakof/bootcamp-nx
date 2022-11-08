import {
	Button,
	ListItem,
	List,
	Icon,
	Stack,
	Heading,
	Text,
} from '@bootcamp-nx/core-ui'
import { memo, MouseEvent } from 'react'
import { TaskForm } from '../task-form'
import Task from '../task/task'

export type ViewTask = {
	done: boolean
	id: number
	text: string
}

type Handlers = {
	onDelete?: (id: ViewTask['id']) => void
	toggleComplete?: (id: ViewTask['id']) => void
	onCreate?: (text: ViewTask['text']) => void
	onEdit?: (id: ViewTask['id']) => void
}

type TaskListProps = {
	tasks: Array<ViewTask>
	title: string
	editingTask?: ViewTask['id'] | null
} & Partial<Handlers>

const TaskListItem = memo(
	({
		task,
		onDelete,
		toggleComplete,
		onEdit,
		isEditing,
	}: { task: ViewTask; isEditing: boolean } & Omit<Handlers, 'onCreate'>) => {
		const handleClick = (event: MouseEvent) => {
			if (event.detail === 2) {
				onEdit?.(task.id)
			}
		}

		const onCreate = (text: string) => {
			console.log({ text })
		}

		return (
			<ListItem
				onClick={handleClick}
				actions={
					<Button
						size='small'
						variant='quaternary'
						onClick={() => onDelete?.(task.id)}
					>
						<Icon size='small'>delete</Icon>
					</Button>
				}
				startActions={
					<Icon size='small' tone='secondary'>
						drag_indicator
					</Icon>
				}
			>
				{isEditing ? (
					<TaskForm onCreate={text => onCreate(text)} />
				) : (
					<Task
						{...task}
						onClick={() => toggleComplete?.(task.id)}
					></Task>
				)}
			</ListItem>
		)
	}
)

TaskListItem.displayName = 'TaskListItem'

export function TaskList({
	tasks,
	title,
	onDelete,
	toggleComplete,
	onCreate,
	onEdit,
	editingTask,
}: TaskListProps) {
	return (
		<Stack space='large'>
			<Stack space='xsmall'>
				<Text size='caption' tone='secondary' weight='bold'>
					2/5 タスク完了
				</Text>
				<Heading level='2' size='larger'>
					{title}
				</Heading>
				<TaskForm onCreate={text => onCreate?.(text)} />
			</Stack>
			<List>
				{tasks.map(task => (
					<TaskListItem
						key={task.id}
						task={task}
						onDelete={onDelete}
						toggleComplete={toggleComplete}
						onEdit={onEdit}
						isEditing={editingTask === task.id}
					/>
				))}
			</List>
		</Stack>
	)
}

export default TaskList
