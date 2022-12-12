/* eslint-disable no-param-reassign */
import { ApiProject } from '@bootcamp-nx/api-interfaces'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type TaskListState = {
	project: ApiProject
	status: 'idle' | 'pending' | 'error'
}

const initialState: TaskListState = {
	project: {} as ApiProject,
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
		loadSuccess(state, action: PayloadAction<ApiProject>) {
			state.project = action.payload
			state.status = 'idle'
		},
		loadFailed(state) {
			state.status = 'error'
		},
	},
})

export const { load, loadSuccess, loadFailed } = taskListSlice.actions

export default taskListSlice.reducer
