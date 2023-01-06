import { ApiUser } from '@bootcamp-nx/api-interfaces'
import { ApiBootcamp } from '@bootcamp-nx/data-access-bootcamp'
import { call, fork, put, take } from 'redux-saga/effects'
import { authSlice } from '../../slices'
import { signIn, signInFailed } from './sign-in.actions'

function* signInWorker() {
	const BootcampApi = ApiBootcamp()

	try {
		yield call(BootcampApi.SignIn)
		const user: ApiUser = yield call(BootcampApi.CurrentUser)
		yield put(authSlice.actions.setUser(user))
	} catch (error) {
		yield put(signInFailed({ error: 'failed to sing in' }))
	}
}

export default function* signInWatcher() {
	while (true) {
		yield take(signIn.type)
		yield fork(signInWorker)
	}
}
