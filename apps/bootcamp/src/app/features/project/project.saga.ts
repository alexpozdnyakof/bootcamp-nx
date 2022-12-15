import { ApiProject } from '@bootcamp-nx/api-interfaces'
import { PayloadAction } from '@reduxjs/toolkit'
import { call, fork, put, take } from 'redux-saga/effects'
import { load, loadFailed, loadSuccess } from './project.slice'

function httpRequest(url: string) {
	return fetch(url).then(response => response.json())
}

export function* loadProject(projectId: string) {
	try {
		const response: ApiProject = yield call(
			httpRequest,
			`/api/project/${projectId}`
		)

		yield put(loadSuccess(response))
	} catch (error) {
		yield put(loadFailed())
	}
}

export function* watchProject() {
	while (true) {
		const action: PayloadAction<{ id: string }> = yield take(load.type)
		const { id } = action.payload
		yield fork(loadProject, id)
	}
}
