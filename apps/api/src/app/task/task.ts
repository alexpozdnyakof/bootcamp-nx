import { Record, String, Boolean } from 'runtypes'
import { Row } from '../database'

export type TaskValue = {
	title: string
	done: 0 | 1
}

export type TaskRow = Row<TaskValue>

export const TaskValue = Record({
	title: String,
	done: Boolean,
})
