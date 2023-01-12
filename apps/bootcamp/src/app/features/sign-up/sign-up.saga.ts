import { ApiUser } from '@bootcamp-nx/api-interfaces'
import { ApiBootcamp } from '@bootcamp-nx/data-access-bootcamp'
import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, take, fork } from 'redux-saga/effects'
import { authSlice } from '../../slices'
import { signUp, signUpFailed } from './sign-up.actions'

function* signUpWorker(credentials: { username: string; password: string }) {
	const api = ApiBootcamp()

	try {
		yield call(api.SignUp, credentials)
		const user: ApiUser = yield call(api.CurrentUser)
		yield put(authSlice.actions.setUser(user))
	} catch (error) {
		yield put(signUpFailed())
	}
}

export default function* signUpWatcher() {
	while (true) {
		const action: PayloadAction<{ username: string; password: string }> =
			yield take(signUp.type)

		yield fork(signUpWorker, action.payload)
	}
}
