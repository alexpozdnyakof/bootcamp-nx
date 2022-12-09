import { ApiProject } from '@bootcamp-nx/api-interfaces'
import { call, put, takeEvery } from 'redux-saga/effects'
import { load, loadFailed, loadSuccess } from './side-menu-slice'

function httpRequest(url: string) {
	return fetch(url).then(response => response.json())
}

export function* loadSideMenu() {
	try {
		const response: Array<ApiProject> = yield call(
			httpRequest,
			'/api/projects'
		)

		yield put(loadSuccess(response))
	} catch (error) {
		// alert(error)
		yield put(loadFailed())
	}
}

export function* watchSideMenu() {
	yield takeEvery(load.type, loadSideMenu)
}
