/* eslint-disable no-param-reassign */
import { ApiCredentials, ApiSignUp, ApiUser } from '@bootcamp-nx/api-interfaces'
import { IApiBootcamp } from '@bootcamp-nx/data-access-bootcamp'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

type AuthState = {
	user: ApiUser | null
}

export const signInThunk = createAsyncThunk(
	'signIn',
	async (credentials: ApiCredentials, ThunkApi) => {
		const api = ThunkApi.extra as IApiBootcamp
		try {
			await api.SignIn(credentials)
			const userResponse = await api.CurrentUser()
			return userResponse.data
		} catch (err) {
			return ThunkApi.rejectWithValue('Failed sign in')
		}
	}
)

export const signUpThunk = createAsyncThunk(
	'signUp',
	async (credentials: ApiSignUp, ThunkApi) => {
		const api = ThunkApi.extra as IApiBootcamp
		try {
			await api.SignUp(credentials)
			const userResponse = await api.CurrentUser()
			return userResponse.data
		} catch (err) {
			return ThunkApi.rejectWithValue('Failed sign up')
		}
	}
)

export const signOutThunk = createAsyncThunk('signOut', async (_, ThunkApi) => {
	const api = ThunkApi.extra as IApiBootcamp
	try {
		const response = await api.Logout()
		return response
	} catch (err) {
		return ThunkApi.rejectWithValue('Failed sign out')
	}
})

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
	extraReducers: builder =>
		builder
			.addCase(signInThunk.fulfilled, (state, action) => {
				state.user = action.payload
			})
			.addCase(signUpThunk.fulfilled, (state, action) => {
				state.user = action.payload
			})
			.addCase(signOutThunk.fulfilled, state => {
				state.user = null
			}),
})

export default authSlice

export const selectUser = (state: RootState) => state.auth.user
