/* eslint-disable @typescript-eslint/dot-notation */
import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import root from './saga'
import { authSlice, projectSlice, taskSlice } from './slices'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
	reducer: {
		[taskSlice.name]: taskSlice.reducer,
		[projectSlice.name]: projectSlice.reducer,
		[authSlice.name]: authSlice.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(sagaMiddleware),
	devTools: process.env['NODE_ENV'] !== 'production',
})

sagaMiddleware.run(root)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
