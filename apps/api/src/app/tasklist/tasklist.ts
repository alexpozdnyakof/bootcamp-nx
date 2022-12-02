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
