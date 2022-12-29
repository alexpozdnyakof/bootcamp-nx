/* eslint-disable no-param-reassign */
import { ApiProject } from '@bootcamp-nx/api-interfaces'
import {
	createEntityAdapter,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit'

const entityAdapter = createEntityAdapter<ApiProject>({
	selectId: project => project.id,
})
const initialState = entityAdapter.getInitialState<{ activeId: number | null }>(
	{ activeId: null }
)
export type ProjectSliceState = typeof initialState

const projectSlice = createSlice({
	name: 'projects',
	initialState,
	reducers: {
		setActive(state, action: PayloadAction<{ id: number }>) {
			state.activeId = action.payload.id
		},
		resetActive(state) {
			state.activeId = null
		},
		setAll(state, action: PayloadAction<Array<ApiProject>>) {
			entityAdapter.setAll(state, action.payload)
		},
	},
})

export default projectSlice
