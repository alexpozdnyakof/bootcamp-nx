import { ApiTaskList } from '@bootcamp-nx/api-interfaces'
import { Record, String } from 'runtypes'
import { Row } from '../database'

export type TaskListValue = {
	title: string
	description: string
}

export type TaskListRow = Row<TaskListValue>

export const TaskListValue = Record({
	title: String,
	description: String,
})

export function CreateTaskList(row: TaskListRow): ApiTaskList {
	return {
		...row,
		type: 'task_list',
	}
}
