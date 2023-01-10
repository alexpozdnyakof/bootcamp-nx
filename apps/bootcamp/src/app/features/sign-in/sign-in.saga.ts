import { ApiUser } from '@bootcamp-nx/api-interfaces'
import { ApiBootcamp } from '@bootcamp-nx/data-access-bootcamp'
import { PayloadAction } from '@reduxjs/toolkit'
import { call, fork, put, take } from 'redux-saga/effects'
import { authSlice } from '../../slices'
import { signIn, signInFailed } from './auth.actions'

function* signInWorker(credentials: { username: string; password: string }) {
	const BootcampApi = ApiBootcamp()

	try {
		yield call(BootcampApi.SignIn, credentials)
		const user: ApiUser = yield call(BootcampApi.CurrentUser)
		yield put(authSlice.actions.setUser(user))
	} catch (error) {
		console.log(error)
		yield put(signInFailed({ error: 'failed to sign in' }))
	}
}

export default function* signInWatcher() {
	while (true) {
		const action: PayloadAction<{ username: string; password: string }> =
			yield take(signIn.type)
		yield fork(signInWorker, action.payload)
	}
}
