import {
	ApiCredentials,
	ApiProject,
	ApiSignUp,
	ApiTask,
	ApiTaskDTO,
	ApiTaskList,
	ApiUser,
} from '@bootcamp-nx/api-interfaces'

export function ApiBootcamp() {
	const httpClient = HttpClient({ urlPrefix: '/api' })

	return {
		async Projects(): Promise<Array<ApiProject>> {
			return httpClient.get('/project')
		},
		async Project(id: number): Promise<ApiProject> {
			return httpClient.get(`/project/${id}`)
		},
		async ProjectTasks(id: number): Promise<Array<Required<ApiTask>>> {
			return httpClient.get(`/project/${id}/tasks`)
		},
		async ProjectTaskslists(id: number): Promise<Array<ApiTaskList>> {
			return httpClient.get(`/project/${id}/tasklists`)
		},
		async Task(id: number): Promise<ApiTask> {
			return httpClient.get(`/task/${id}`)
		},
		async SaveTask(
			dto: ApiTaskDTO
		): Promise<{ code: number; data: { id: number } }> {
			return httpClient.post(`/task`, dto)
		},
		async LinkTaskToTasklist({
			listId,
			taskId,
		}: {
			listId: number
			taskId: number
		}): Promise<string | void> {
			return httpClient.post(`/tasklist/${listId}/task`, {
				id: taskId,
			})
		},
		async UpdateTask(id: number, dto: ApiTaskDTO): Promise<string | void> {
			return httpClient.put(`/task/${id}`, dto)
		},
		async DeleteTask(id: number): Promise<string | void> {
			return httpClient.delete(`/task/${id}`)
		},

		async SignIn(credentials: ApiCredentials): Promise<void> {
			return httpClient.post(`/auth/sign-in`, credentials)
		},
		async SignUp(signUpDTO: ApiSignUp): Promise<void> {
			return httpClient.post(`/auth/sign-up`, signUpDTO)
		},
		async CurrentUser(): Promise<ApiUser> {
			return httpClient.get(`/auth/user`)
		},
		async Logout(): Promise<void> {
			return httpClient.get(`/auth/logout`)
		},
	}
}

type HttpClientOptions = {
	urlPrefix: string
}

type RequestBody = { [key: string]: any }

function HttpClient({ urlPrefix }: HttpClientOptions) {
	const handleResponse = (response: Response) => {
		if (!response.ok) throw new Error(response.statusText)
		return response
	}

	const defaultHeaders = {
		'Content-Type': 'application/json;charset=utf-8',
	}
	const withPrefix = (url: string) => urlPrefix.concat(url)

	return {
		async get<T = unknown>(url: string): Promise<T> {
			return fetch(withPrefix(url), { headers: defaultHeaders })
				.then(handleResponse)
				.then(response => response.json())
		},
		async post<T>(url: string, body: RequestBody): Promise<T> {
			return fetch(withPrefix(url), {
				method: 'POST',
				body: JSON.stringify(body),
				headers: defaultHeaders,
			})
				.then(handleResponse)
				.then(response => response.json())
		},
		async put<T>(url: string, body: RequestBody): Promise<T> {
			return fetch(withPrefix(url), {
				method: 'PUT',
				body: JSON.stringify(body),
				headers: defaultHeaders,
			})
				.then(handleResponse)
				.then(response => response.json())
		},
		async delete<T = unknown>(url: string): Promise<T> {
			return fetch(withPrefix(url), {
				method: 'DELETE',
				headers: defaultHeaders,
			})
				.then(handleResponse)
				.then(response => response.json())
		},
	}
}
