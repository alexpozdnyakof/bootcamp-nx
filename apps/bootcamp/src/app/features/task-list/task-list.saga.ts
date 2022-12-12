import { ApiProject } from '@bootcamp-nx/api-interfaces'
import { PayloadAction } from '@reduxjs/toolkit'
import { call, fork, put, take } from 'redux-saga/effects'
import { load, loadFailed, loadSuccess } from './task-list.slice'

function httpRequest(url: string) {
	return fetch(url).then(response => response.json())
}

export function* loadTasklist(projectId: string) {
	try {
		const response: ApiProject = yield call(
			httpRequest,
			'/api/projects/'.concat(projectId)
		)

		yield put(loadSuccess(response))
	} catch (error) {
		yield put(loadFailed())
	}
}

export function* watchTasklist() {
	while (true) {
		const action: PayloadAction<{ id: string }> = yield take(load.type)
		const { id } = action.payload
		yield fork(loadTasklist, id)
	}
}
