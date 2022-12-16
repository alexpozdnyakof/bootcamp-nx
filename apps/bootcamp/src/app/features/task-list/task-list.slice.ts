/* eslint-disable no-param-reassign */
import { ApiTask, ApiTaskList } from '@bootcamp-nx/api-interfaces'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type TaskListState = {
	status: 'idle' | 'pending' | 'error'
	tasks: Array<Required<ApiTask>>
	lists: Array<ApiTaskList>
}

const initialState: TaskListState = {
	tasks: [],
	lists: [],
	status: 'idle',
}

const taskListSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		load(state, action: PayloadAction<{ id: string }>) {
			state.status = 'pending'
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
		loadFailed(state) {
			state.status = 'error'
		},
	},
})

export const { load, loadTasklistsSuccess, loadTasksSuccess, loadFailed } =
	taskListSlice.actions

export default taskListSlice.reducer
