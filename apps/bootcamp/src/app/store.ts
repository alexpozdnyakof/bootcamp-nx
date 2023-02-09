/* eslint-disable @typescript-eslint/dot-notation */
import { ApiBootcamp } from '@bootcamp-nx/data-access-bootcamp'
import { configureStore, Middleware } from '@reduxjs/toolkit'
import { authSlice, projectSlice, taskSlice } from './slices'

const logger: Middleware = store => next => action => {
	console.log('dispatching', action)
	const result = next(action)
	console.log('next state', store.getState())
	return result
}

export const store = configureStore({
	reducer: {
		[taskSlice.name]: taskSlice.reducer,
		[projectSlice.name]: projectSlice.reducer,
		[authSlice.name]: authSlice.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			thunk: {
				extraArgument: ApiBootcamp(),
			},
		}).concat([logger]),
	devTools: process.env['NODE_ENV'] !== 'production',
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
