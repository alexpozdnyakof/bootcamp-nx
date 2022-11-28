import { Record, String } from 'runtypes'

export type TaskList = {
	id: UniqueId
	title: string
	description: string
} & UpdatedCreatedTime

export type TaskListDTO = Pick<TaskList, 'title' | 'description'>

export const TaskListDTO = Record({
	title: String,
	description: String,
})
