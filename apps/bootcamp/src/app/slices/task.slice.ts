import { ApiTask } from '@bootcamp-nx/api-interfaces'
import {
	createEntityAdapter,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit'

const entityAdapter = createEntityAdapter<Required<ApiTask>>({
	selectId: task => task.id,
})
const initialState = entityAdapter.getInitialState()
export type TaskSliceState = typeof initialState

const taskSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		setAll(state, action: PayloadAction<Array<Required<ApiTask>>>) {
			entityAdapter.setAll(state, action.payload)
		},
		addTask(state, action: PayloadAction<Required<ApiTask>>) {
			entityAdapter.addOne(state, action.payload)
		},
		removeOneTask(state, action: PayloadAction<{ id: number }>) {
			entityAdapter.removeOne(state, action.payload.id)
		},
		updateOneTask(state, action: PayloadAction<ApiTask>) {
			const { id, ...changes } = action.payload
			entityAdapter.updateOne(state, { id, changes })
		},
	},
})

export default taskSlice

export const { setAll, addTask, removeOneTask, updateOneTask } =
	taskSlice.actions
