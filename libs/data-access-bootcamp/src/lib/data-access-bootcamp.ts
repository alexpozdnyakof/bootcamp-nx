import {
	ApiProject,
	ApiTask,
	ApiTaskDTO,
	ApiTaskList,
	ApiUser,
} from '@bootcamp-nx/api-interfaces'

export function ApiBootcamp() {
	const ROOT = '/api'
	const getFullUrl = (endpoint: string) => ROOT.concat(endpoint)

	return {
		async Projects(): Promise<Array<ApiProject>> {
			return fetch(getFullUrl(`/project`)).then(response =>
				response.json()
			)
		},
		async Project(id: number): Promise<ApiProject> {
			return fetch(getFullUrl(`/project/${id}`)).then(response =>
				response.json()
			)
		},
		async ProjectTasks(id: number): Promise<Array<Required<ApiTask>>> {
			return fetch(getFullUrl(`/project/${id}/tasks`)).then(response =>
				response.json()
			)
		},
		async ProjectTaskslists(id: number): Promise<Array<ApiTaskList>> {
			return fetch(getFullUrl(`/project/${id}/tasklists`)).then(
				response => response.json()
			)
		},
		async Task(id: number): Promise<ApiTask> {
			return fetch(getFullUrl(`/task/${id}`)).then(response =>
				response.json()
			)
		},
		async SaveTask(dto: ApiTaskDTO): Promise<{ id: number }> {
			return fetch(getFullUrl(`/task`), {
				method: 'POST',
				body: JSON.stringify(dto),
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
			}).then(response => response.json())
		},
		async LinkTaskToTasklist({
			listId,
			taskId,
		}: {
			listId: number
			taskId: number
		}): Promise<string | void> {
			return fetch(getFullUrl(`/tasklist/${listId}/task`), {
				method: 'POST',
				body: JSON.stringify({
					id: taskId,
				}),
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
			}).then(response => response.text())
		},
		async UpdateTask(id: number, dto: ApiTaskDTO): Promise<string | void> {
			return fetch(getFullUrl(`/task/${id}`), {
				method: 'PUT',
				body: JSON.stringify(dto),
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
			}).then(response => response.text())
		},
		async DeleteTask(id: number): Promise<string | void> {
			return fetch(getFullUrl(`/task/${id}`), {
				method: 'DELETE',
			}).then(response => response.text())
		},
		async SignIn(credentials: {
			username: string
			password: string
		}): Promise<void> {
			return fetch(getFullUrl(`/auth/sign-in`), {
				method: 'POST',
				body: JSON.stringify(credentials),
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
			}).then()
		},
		async CurrentUser(): Promise<ApiUser> {
			return fetch(getFullUrl(`/auth/user`)).then(response =>
				response.json()
			)
		},
	}
}
