/* eslint-disable @typescript-eslint/dot-notation */
import { ApiTask } from '@bootcamp-nx/api-interfaces'
import { configureStore, createSelector } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import root from './saga'
import { projectSlice, sectionSlice, taskSlice } from './slices'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
	reducer: {
		[taskSlice.name]: taskSlice.reducer,
		[projectSlice.name]: projectSlice.reducer,
		[sectionSlice.name]: sectionSlice.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(sagaMiddleware),
	devTools: process.env['NODE_ENV'] !== 'production',
})

sagaMiddleware.run(root)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const selectTasksGroupedBySections = createSelector(
	[
		(state: RootState) =>
			Object.entries(state.tasks.entities).map(([id, task]) => ({
				id,
				...task,
			})),
		(state: RootState) =>
			Object.entries(state.sections.entities).map(([id, section]) => ({
				id,
				...section,
			})),
	],
	(tasks, sections) =>
		sections.map(section => ({
			...section,
			tasks: tasks.filter(
				task => task.tasklist_id === section.id
			) as Array<Required<ApiTask>>,
		}))
)
