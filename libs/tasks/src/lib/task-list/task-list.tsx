import styles from './task-list.module.less'

/* eslint-disable-next-line */
export interface TaskListProps {}

export function TaskList(props: TaskListProps) {
	return (
		<div className={styles['container']}>
			<h1>Welcome to TaskList!</h1>
		</div>
	)
}

export default TaskList
