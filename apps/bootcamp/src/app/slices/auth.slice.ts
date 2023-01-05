/* eslint-disable no-param-reassign */
import { ApiUser } from '@bootcamp-nx/api-interfaces'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type AuthState = {
	user: ApiUser | null
}

const initialState: AuthState = {
	user: null,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<ApiUser>) {
			state.user = action.payload
		},
		resetUser(state) {
			state.user = null
		},
	},
})

export default authSlice
