import { ApiCredentials, ApiSignUp } from '@bootcamp-nx/api-interfaces'
import { all, fork } from 'redux-saga/effects'
import { useAppDispatch } from '../../store-hooks'
import { signIn } from './sign-in.actions'
import signInWatcher from './sign-in.saga'
import { signUp } from './sign-up.actions'
import signUpWatcher from './sign-up.saga'

export function useAuth() {
	const dispatch = useAppDispatch()

	return {
		signIn(credentials: ApiCredentials) {
			dispatch(signIn(credentials))
		},
		signUp(signUpDTO: ApiSignUp) {
			dispatch(signUp(signUpDTO))
		},
	}
}

export function* authSaga() {
	yield all([fork(signInWatcher), fork(signUpWatcher)])
}
