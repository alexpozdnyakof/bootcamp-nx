export interface Message {
	message: string
}
export interface ApiProject {
	id: number
	title: string
	description: string | null
	owner_id: number
	created: Date
	updated: Date
}

export interface ApiNewProject {
	title: string
	description?: string
}

export interface ApiTask {
	id: number
	title: string
	done: boolean
	created: Date
	updated: Date
	project_id: number
}

export interface ApiTaskDTO {
	title: string
	done: boolean
	project_id: number
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
	first_name: string
	last_name: string
	birthdate: Date | string
}

export interface ApiCredentials {
	username: string
	password: string
}

export type ApiSignUp = Omit<ApiUser, 'id'> & Omit<ApiCredentials, 'username'>

export type ResponseWithMessage = {
	code: number
	message: string
}

export type ResponseWithData<T> = {
	code: number
	data: T
}
