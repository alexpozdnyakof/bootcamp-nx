import styles from './task-form.module.less'

type TaskFormProps = {
	onCreate: (title: string) => void
}

export function TaskForm({ onCreate }: TaskFormProps) {
	return (
		<div className={styles['container']}>
			<h1>Welcome to TaskForm!</h1>
		</div>
	)
}

export default TaskForm
