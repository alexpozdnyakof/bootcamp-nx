/* eslint-disable no-param-reassign */
import { ApiProject, ApiTask, ApiTaskList } from '@bootcamp-nx/api-interfaces'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type TaskListState = {
	status: 'idle' | 'pending' | 'error'
	tasks: Array<ApiTask & { tasklist_id: number }>
	lists: Array<ApiTaskList>
	project: ApiProject | null
}

const initialState: TaskListState = {
	project: null,
	tasks: [],
	lists: [],
	status: 'idle',
}

const taskListSlice = createSlice({
	name: 'tasklist',
	initialState,
	reducers: {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		load(state, action: PayloadAction<{ id: string }>) {
			state.status = 'pending'
		},
		loadProjectSuccess(state, action: PayloadAction<ApiProject>) {
			state.project = action.payload
		},
		loadTasklistsSuccess(state, action: PayloadAction<Array<ApiTaskList>>) {
			state.lists = action.payload
		},
		loadTasksSuccess(
			state,
			action: PayloadAction<Array<ApiTask & { tasklist_id: number }>>
		) {
			state.tasks = action.payload
		},
		loadFailed(state) {
			state.status = 'error'
		},
	},
})

export const {
	load,
	loadProjectSuccess,
	loadTasklistsSuccess,
	loadTasksSuccess,
	loadFailed,
} = taskListSlice.actions

export default taskListSlice.reducer
