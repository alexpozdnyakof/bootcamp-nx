import { ApiBootcamp } from '@bootcamp-nx/data-access-bootcamp'
import { call, fork, put, take } from 'redux-saga/effects'
import { authSlice } from '../../slices'
import { logout, logoutFailed } from './logout.action'

function* logoutWorker() {
	const api = ApiBootcamp()

	try {
		yield call(api.Logout)
		yield put(authSlice.actions.resetUser())
	} catch (error) {
		yield put(logoutFailed())
	}
}

export default function* logoutSaga() {
	while (true) {
		yield take(logout.type)
		yield fork(logoutWorker)
	}
}
