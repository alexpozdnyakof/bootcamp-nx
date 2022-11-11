import { Box } from '@bootcamp-nx/core-ui'
import { TaskListProvider } from '../task-list-context'
import { TaskList } from './task-list'
import { TASKS_DATA } from './tasks-data'
export default {
	component: TaskList,
	title: 'Tasks/TaskList',
}

export function Interactive() {
	return (
		<Box marginLeft='xlarge'>
			<TaskListProvider tasks={TASKS_DATA} title='素晴らしいタスクリスト'>
				<TaskList />
			</TaskListProvider>
		</Box>
	)
}
