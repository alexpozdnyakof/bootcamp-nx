import {
	ApiCredentials,
	ApiSignUp,
	ApiUser,
	ResponseWithData,
} from '@bootcamp-nx/api-interfaces'
import { ApiBootcamp } from '@bootcamp-nx/data-access-bootcamp'
import { PayloadAction } from '@reduxjs/toolkit'
import { all, call, fork, put, take } from 'redux-saga/effects'
import { authSlice } from '../../slices'
import {
	logout,
	logoutFailed,
	signIn,
	signInFailed,
	signUp,
	signUpFailed,
} from './auth-actions'

const api = ApiBootcamp()

function* signInWorker(credentials: ApiCredentials) {
	try {
		yield call(api.SignIn, credentials)
		const response: ResponseWithData<ApiUser> = yield call(api.CurrentUser)

		yield put(authSlice.actions.setUser(response.data))
	} catch (error) {
		yield put(signInFailed({ error: 'failed to sign in' }))
	}
}

function* signUpWorker(credentials: ApiSignUp) {
	try {
		yield call(api.SignUp, credentials)
		const response: ResponseWithData<ApiUser> = yield call(api.CurrentUser)
		yield put(authSlice.actions.setUser(response.data))
	} catch (error) {
		yield put(signUpFailed())
	}
}

function* logoutWorker() {
	try {
		yield call(api.Logout)
		yield put(authSlice.actions.resetUser())
	} catch (error) {
		yield put(logoutFailed())
	}
}

function* signUpSaga() {
	while (true) {
		const action: PayloadAction<ApiSignUp> = yield take(signUp.type)

		yield fork(signUpWorker, action.payload)
	}
}

function* signInSaga() {
	while (true) {
		const action: PayloadAction<ApiCredentials> = yield take(signIn.type)
		yield fork(signInWorker, action.payload)
	}
}

function* logoutSaga() {
	while (true) {
		yield take(logout.type)
		yield fork(logoutWorker)
	}
}

export default function* authSaga() {
	yield all([fork(signInSaga), fork(signUpSaga), fork(logoutSaga)])
}
