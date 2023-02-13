/* eslint-disable @typescript-eslint/dot-notation */
import { ApiBootcamp, IApiBootcamp } from '@bootcamp-nx/data-access-bootcamp'
import {
	configureStore,
	createListenerMiddleware,
	ListenerEffectAPI,
	TypedStartListening,
} from '@reduxjs/toolkit'
import { authSlice, projectSlice, taskSlice } from './slices'
import { apiSlice } from './slices/api.slice'
import searchSlice from './slices/search.slice'

// const logger: Middleware = store => next => action => {
// 	console.log('dispatching', action)
// 	const result = next(action)
// 	console.log('next state', store.getState())
// 	return result
// }

export type AppStartListening = TypedStartListening<
	RootState,
	AppDispatch,
	IApiBootcamp
>

export type AppEffectApi = ListenerEffectAPI<
	RootState,
	AppDispatch,
	IApiBootcamp
>

const api = ApiBootcamp()
const listenerMiddleware = createListenerMiddleware({ extra: api })

export const appStartListening =
	listenerMiddleware.startListening as AppStartListening

export const store = configureStore({
	reducer: {
		[taskSlice.name]: taskSlice.reducer,
		[projectSlice.name]: projectSlice.reducer,
		[authSlice.name]: authSlice.reducer,
		[searchSlice.name]: searchSlice.reducer,
		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			thunk: {
				extraArgument: ApiBootcamp(),
			},
		})
			.prepend(listenerMiddleware.middleware)
			.concat(apiSlice.middleware),
	devTools: process.env['NODE_ENV'] !== 'production',
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
