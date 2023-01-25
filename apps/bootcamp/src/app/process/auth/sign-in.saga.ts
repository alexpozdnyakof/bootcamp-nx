import { ApiCredentials, ApiUser } from '@bootcamp-nx/api-interfaces'
import { ApiBootcamp } from '@bootcamp-nx/data-access-bootcamp'
import { PayloadAction } from '@reduxjs/toolkit'
import { call, fork, put, take } from 'redux-saga/effects'
import { authSlice } from '../../slices'
import { signIn, signInFailed } from './sign-in.actions'

function* signInWorker(credentials: ApiCredentials) {
	const BootcampApi = ApiBootcamp()

	try {
		yield call(BootcampApi.SignIn, credentials)
		const user: ApiUser = yield call(BootcampApi.CurrentUser)
		yield put(authSlice.actions.setUser(user))
	} catch (error) {
		yield put(signInFailed({ error: 'failed to sign in' }))
	}
}

export default function* signInWatcher() {
	while (true) {
		const action: PayloadAction<ApiCredentials> = yield take(signIn.type)
		yield fork(signInWorker, action.payload)
	}
}