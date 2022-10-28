import { Button } from '../button'
import { Heading } from '../heading'
import { Icon } from '../icon'
import { List } from '../list'
import { ListItem } from '../list-item'
import { Stack } from '../stack'
import { Task } from '../task'
import { TaskForm } from '../task-form'
import { Text } from '../text'

export type ViewTask = {
	done: boolean
	id: number
	text: string
}

type Handlers = {
	onDelete?: (id: ViewTask['id']) => void
	onComplete?: (id: ViewTask['id']) => void
	onCreate?: (text: ViewTask['text']) => void
}

type TaskListProps = {
	tasks: Array<ViewTask>
	title: string
} & Partial<Handlers>

export function TaskList({
	tasks,
	title,
	onDelete,
	onComplete,
	onCreate,
}: TaskListProps) {
	return (
		<Stack space='large'>
			<Stack space='xsmall'>
				<Text size='caption' tone='secondary' weight='bold'>
					2/5 completed
				</Text>
				<Heading level='2' size='larger'>
					{title}
				</Heading>
				<TaskForm onCreate={text => onCreate?.(text)} />
			</Stack>
			<List>
				{tasks.map((task, i) => (
					<ListItem
						key={task.id}
						actions={
							<Button
								size='small'
								variant='quaternary'
								onClick={() => onDelete?.(task.id)}
							>
								<Icon size='small'>delete</Icon>
							</Button>
						}
					>
						<Task
							{...task}
							onClick={() => onComplete?.(task.id)}
						></Task>
					</ListItem>
				))}
			</List>
		</Stack>
	)
}

export default TaskList
