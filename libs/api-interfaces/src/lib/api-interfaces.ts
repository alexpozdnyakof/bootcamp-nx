export interface Message {
	message: string
}
export interface ApiProject {
	id: number
	title: string
	description: string | null
	created: string
	updated: string
	type: 'project'
}

export interface ApiTask {
	id: number
	title: string
	done: boolean
	created: string
	updated: string
	tasklist_id?: number
	type: 'task'
}

export interface ApiTaskDTO {
	title: string
	done: boolean
}

export interface ApiTaskListDTO {
	title: string
	description: string
}

export interface ApiTaskList {
	id: number
	title: string
	description: string | null
	created: string
	updated: string
	type: 'task_list'
}

export interface ApiUser {
	id: number
	username: string
}

export interface ApiCredentials {
	username: string
	password: string
}
