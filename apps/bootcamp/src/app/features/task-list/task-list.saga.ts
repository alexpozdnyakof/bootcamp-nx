import { ApiTask, ApiTaskList } from '@bootcamp-nx/api-interfaces'
import { PayloadAction } from '@reduxjs/toolkit'
import { call, fork, put, take } from 'redux-saga/effects'
import {
	load,
	loadFailed,
	loadTasklistsSuccess,
	loadTasksSuccess,
} from './task-list.slice'

function httpRequest(url: string) {
	return fetch(url).then(response => response.json())
}

export function* loadTasklists(projectId: string) {
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

export function* loadTasks(projectId: string) {
	try {
		const response: Array<ApiTask & { tasklist_id: number }> = yield call(
			httpRequest,
			`/api/project/${projectId}/tasks`
		)

		yield put(loadTasksSuccess(response))
	} catch (error) {
		yield put(loadFailed())
	}
}

export function* watchTasklist() {
	while (true) {
		const action: PayloadAction<{ id: string }> = yield take(load.type)
		const { id } = action.payload
		yield fork(loadTasklists, id)
		yield fork(loadTasks, id)
	}
}
