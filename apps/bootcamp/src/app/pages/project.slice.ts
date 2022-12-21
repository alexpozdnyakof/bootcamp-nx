/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	ApiProject,
	ApiTask,
	ApiTaskDTO,
	ApiTaskList,
} from '@bootcamp-nx/api-interfaces'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Nullable<T> = { [P in keyof T]: T[P] | null }

type ProjectPageState = {
	lists: Array<ApiTaskList>
	tasks: Array<Required<ApiTask>>
} & Omit<Nullable<ApiProject>, 'type'>

const initialState: ProjectPageState = {
	id: null,
	title: null,
	description: null,
	created: null,
	updated: null,
	lists: [],
	tasks: [],
}

const projectPageSlice = createSlice({
	name: 'project',
	initialState,
	reducers: {
		load(state, action: PayloadAction<{ id: number }>) {
			return state
		},
		loadProjectSuccess(state, action: PayloadAction<ApiProject>) {
			const { id, title, description, created, updated } = action.payload
			state.id = id
			state.title = title
			state.description = description
			state.created = created
			state.updated = updated
		},
		loadTasklistsSuccess(state, action: PayloadAction<Array<ApiTaskList>>) {
			state.lists = action.payload
		},
		loadTasksSuccess(
			state,
			action: PayloadAction<Array<Required<ApiTask>>>
		) {
			state.tasks = action.payload
		},
		addTask(
			state,
			action: PayloadAction<{ listId: number; dto: ApiTaskDTO }>
		) {
			return state
		},
		addTaskSuccess(state, action: PayloadAction<Required<ApiTask>>) {
			state.tasks.push(action.payload)
		},
		changeTaskStatus(state, action: PayloadAction<{ id: number }>) {
			return state
		},
		changeTaskStatusSuccess(state, action: PayloadAction<ApiTask>) {
			state.tasks = state.tasks.map(task =>
				task.id === action.payload.id
					? { ...task, ...action.payload }
					: task
			)
		},
		deleteTask(state, action: PayloadAction<{ id: number }>) {
			return state
		},
		deleteTaskSuccess(state, action: PayloadAction<{ id: number }>) {
			state.tasks = state.tasks.filter(
				task => task.id !== action.payload.id
			)
		},
		changeTaskTitle(
			state,
			action: PayloadAction<{ id: number; title: string }>
		) {
			return state
		},
		changeTaskTitleSuccess(state, action: PayloadAction<ApiTask>) {
			state.tasks = state.tasks.map(task =>
				task.id === action.payload.id
					? { ...task, ...action.payload }
					: task
			)
		},
		loadFailed(state) {
			return state
		},
	},
})

export const {
	load,
	loadTasklistsSuccess,
	loadProjectSuccess,
	loadTasksSuccess,
	loadFailed,
	addTask,
	addTaskSuccess,
	changeTaskStatus,
	changeTaskStatusSuccess,
	deleteTask,
	deleteTaskSuccess,
	changeTaskTitle,
	changeTaskTitleSuccess,
} = projectPageSlice.actions

export default projectPageSlice.reducer
