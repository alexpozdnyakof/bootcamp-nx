import { Record, String, Boolean } from 'runtypes'

export type Task = {
	id: UniqueId
	title: string
	done: boolean
} & UpdatedCreatedTime

export type TaskDTO = Pick<Task, 'title' | 'done'>

export const TaskDTO = Record({
	title: String,
	done: Boolean,
})
