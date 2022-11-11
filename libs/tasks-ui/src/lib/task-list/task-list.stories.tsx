import { Box } from '@bootcamp-nx/core-ui'
import { TaskListProvider } from '../task-list-context'
import { TaskList } from './task-list'

export default {
	component: TaskList,
	title: 'Tasks/TaskList',
}

export function Interactive() {
	return (
		<Box marginLeft='xlarge'>
			<TaskListProvider>
				<TaskList />
			</TaskListProvider>
		</Box>
	)
}
