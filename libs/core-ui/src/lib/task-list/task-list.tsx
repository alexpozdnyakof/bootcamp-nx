import styles from './task-list.module.less'
import { Stack } from '../stack'
import { Task } from '../task'
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
