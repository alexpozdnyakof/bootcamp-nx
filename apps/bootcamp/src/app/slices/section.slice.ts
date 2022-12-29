/* eslint-disable no-param-reassign */
import { ApiTaskList } from '@bootcamp-nx/api-interfaces'
import {
	createEntityAdapter,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit'

const entityAdapter = createEntityAdapter<ApiTaskList>({
	selectId: section => section.id,
})

const initialState = entityAdapter.getInitialState()
export type SectionSliceState = typeof initialState

const sectionSlice = createSlice({
	name: 'sections',
	initialState,
	reducers: {
		setAll(state, action: PayloadAction<Array<ApiTaskList>>) {
			entityAdapter.setAll(state, action.payload)
		},
	},
})

export default sectionSlice
