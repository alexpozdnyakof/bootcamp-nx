import { ApiTask } from '@bootcamp-nx/api-interfaces'
import { Record, String, Boolean as RTBoolean } from 'runtypes'
import { Row } from '../database'

export type TaskValue = {
	title: string
	done: 0 | 1
}

export type TaskRow = Row<TaskValue>

export const TaskValue = Record({
	title: String,
	done: RTBoolean,
})

export function CreateTask({ done, ...row }: TaskRow): ApiTask {
	return {
		...row,
		done: Boolean(done),
		type: 'task',
	}
}
