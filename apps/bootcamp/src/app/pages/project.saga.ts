import {
	ApiProject,
	ApiTask,
	ApiTaskDTO,
	ApiTaskList,
} from '@bootcamp-nx/api-interfaces'
import { PayloadAction } from '@reduxjs/toolkit'
import { call, fork, put, take } from 'redux-saga/effects'
import {
	addTask,
	addTaskSuccess,
	load,
	loadFailed,
	loadProjectSuccess,
	loadTasklistsSuccess,
	loadTasksSuccess,
} from './project.slice'

function httpRequest(url: string) {
	console.log({ url })
	return fetch(url).then(response => response.json())
}

function httpPostRequest<T extends { [key: string]: any }>(
	url: string,
	body: T,
	readAs: 'text' | 'json' = 'json'
) {
	return fetch(url, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
	}).then(response => {
		switch (readAs) {
			case 'json':
				return response.json()
			case 'text':
				return response.text()
			default:
				return response.json()
		}
	})
}

export function* loadProject(projectId: number) {
	try {
		const response: ApiProject = yield call(
			httpRequest,
			`/api/project/${projectId}`
		)

		yield put(loadProjectSuccess(response))
	} catch (error) {
		yield put(loadFailed())
	}
}

function* loadTasks(projectId: number) {
	try {
		const response: Array<Required<ApiTask>> = yield call(
			httpRequest,
			`/api/project/${projectId}/tasks`
		)

		yield put(loadTasksSuccess(response))
	} catch (error) {
		yield put(loadFailed())
	}
}
function* loadTasklists(projectId: number) {
	try {
		const response: Array<ApiTaskList> = yield call(
			httpRequest,
			`/api/project/${projectId}/tasklists`
		)

		yield put(loadTasklistsSuccess(response))
	} catch (error) {
		yield put(loadFailed())
	}
}

function* addTaskWorker({ listId, dto }: { listId: number; dto: ApiTaskDTO }) {
	try {
		const response: { id: number } = yield call(
			httpPostRequest,
			'/api/task',
			dto
		)

		yield call(
			httpPostRequest,
			`/api/tasklist/${listId}/task`,
			{
				id: response.id,
			},
			'text'
		)

		const task: ApiTask = yield call(
			httpRequest,
			`/api/task/${response.id}`
		)

		yield put(addTaskSuccess({ ...task, tasklist_id: listId }))
	} catch (error) {
		yield put(loadFailed())
	}
}

export function* watchAddTask() {
	while (true) {
		const action: PayloadAction<{ listId: number; dto: ApiTaskDTO }> =
			yield take(addTask.type)
		yield fork(addTaskWorker, action.payload)
	}
}

export function* watchProject() {
	while (true) {
		const action: PayloadAction<{ id: number }> = yield take(load.type)
		const { id } = action.payload
		yield fork(loadProject, id)
		yield fork(loadTasks, id)
		yield fork(loadTasklists, id)
	}
}
