import {
	ApiCredentials,
	ApiSignUp,
	ApiUser,
	ResponseWithData,
} from '@bootcamp-nx/api-interfaces'
import { ApiBootcamp } from '@bootcamp-nx/data-access-bootcamp'
import { autorun, makeAutoObservable } from 'mobx'

export function createAuthStore(user: ApiUser | null = null) {
	const api = ApiBootcamp()

	const store = {
		user,
		setUser(user: ApiUser) {
			this.user = user
		},
		resetUser() {
			this.user = null
		},
		get isLoggedIn() {
			return this.user !== null
		},
		*signIn(credentials: ApiCredentials) {
			try {
				yield api.SignIn(credentials)
				this.fetchUser()
			} catch (error) {
				console.log(error)
			}
		},
		*signUp(credentials: ApiSignUp) {
			try {
				yield api.SignUp(credentials)
				this.fetchUser()
			} catch (error) {
				console.log(error)
			}
		},
		*fetchUser() {
			try {
				const response: ResponseWithData<ApiUser> =
					yield api.CurrentUser()
				this.setUser(response.data)
			} catch (error) {
				console.error(error)
				console.error('Unauthorized')
			}
		},
	}

	makeAutoObservable(store)

	store.fetchUser()

	autorun(() => {
		if (store.user) {
			console.log('logged in', store.user.username)
		}
	})

	return store
}

export type AuthStore = ReturnType<typeof createAuthStore>
