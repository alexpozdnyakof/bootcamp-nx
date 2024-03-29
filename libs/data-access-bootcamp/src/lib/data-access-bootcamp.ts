import {
	ApiCredentials,
	ApiNewProject,
	ApiProject,
	ApiSignUp,
	ApiTask,
	ApiTaskDTO,
	ApiUser,
	ResponseWithData,
	ResponseWithMessage,
} from '@bootcamp-nx/api-interfaces'
import compose from './compose'

export function ApiBootcamp() {
	const httpClient = HttpClient({ urlPrefix: '/api' })

	return {
		async Projects(): Promise<ResponseWithData<ApiProject[]>> {
			return httpClient.get('/project')
		},
		async Project(id: number): Promise<ResponseWithData<ApiProject>> {
			return httpClient.get(`/project/${id}`)
		},
		async SaveProject(
			newProject: ApiNewProject
		): Promise<ResponseWithData<{ id: number }>> {
			return httpClient.post(`/project`, newProject)
		},
		async ProjectTasks(id: number): Promise<ResponseWithData<ApiTask[]>> {
			return httpClient.get(`/project/${id}/tasks`)
		},
		async SaveTask(
			dto: ApiTaskDTO
		): Promise<{ code: number; data: { id: number } }> {
			return httpClient.post(`/task`, dto)
		},

		async GetTask(id: number): Promise<ResponseWithData<ApiTask>> {
			return httpClient.get(`/task/${id}`)
		},
		async UpdateTask(
			id: number,
			dto: ApiTaskDTO
		): Promise<ResponseWithMessage> {
			return httpClient.put(`/task/${id}`, dto)
		},
		async DeleteTask(id: number): Promise<ResponseWithMessage> {
			return httpClient.delete(`/task/${id}`)
		},
		async SignIn(
			credentials: ApiCredentials
		): Promise<ResponseWithMessage> {
			return httpClient.post(`/auth/sign-in`, credentials)
		},
		async SignUp(signUpDTO: ApiSignUp): Promise<ResponseWithMessage> {
			return httpClient.post(`/auth/sign-up`, signUpDTO)
		},
		async CurrentUser(): Promise<ResponseWithData<ApiUser>> {
			return httpClient.get(`/user`)
		},
		async Logout(): Promise<ResponseWithMessage> {
			return httpClient.get(`/auth/logout`)
		},
		async Search(params: {
			title: string
		}): Promise<ResponseWithData<Required<ApiProject | ApiTask>[]>> {
			return httpClient.get(`/search`, params)
		},
	}
}

export type IApiBootcamp = ReturnType<typeof ApiBootcamp>

type HttpClientOptions = {
	urlPrefix: string
}

type RequestBody = { [key: string]: any }

type SearchParams = { [key: string]: any }

function HttpClient({ urlPrefix }: HttpClientOptions) {
	const handleResponse = (response: Response) => {
		if (!response.ok) throw new Error(response.statusText)
		return response
	}

	const defaultHeaders = {
		'Content-Type': 'application/json;charset=utf-8',
	}
	const withPrefix = (url: string) => urlPrefix.concat(url)
	const withSearchParams = (params?: SearchParams) => (url: string) =>
		url.concat(params ? `?${new URLSearchParams(params).toString()}` : '')

	const createUrl = (params?: SearchParams) =>
		compose(withPrefix, withSearchParams(params))

	// compose
	return {
		async get<T = unknown>(
			urlPart: string,
			params?: SearchParams
		): Promise<T> {
			return fetch(createUrl(params)(urlPart), {
				headers: defaultHeaders,
			})
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
