import { Stack, Task } from '@bootcamp-nx/core-ui'
import styles from './task-list.module.less'

export type Task = {
	done: boolean
	id: number
	text: string
}
export interface TaskListProps {
	tasks: Array<Task>
}

export function TaskList({ tasks }: TaskListProps) {
	const onClick = (id: number) => {
		console.log(id, 'clicked')
	}

	return (
		<Stack space='xsmall'>
			{tasks.map((task, i) => (
				<Task
					{...task}
					onClick={onClick}
					key={`${task.text}-${i}`}
				></Task>
			))}
		</Stack>
	)
}

export default TaskList
