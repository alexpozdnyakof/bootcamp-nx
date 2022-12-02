import { TaskListRow } from '../tasklist/tasklist'
import { ProjectRow } from './project'

export function createApiProject(
	aRow: ProjectRow,
	tasklists: Array<TaskListRow>
) {
	return {
		...aRow,
		tasklists,
		type: 'project',
	} as const
}
