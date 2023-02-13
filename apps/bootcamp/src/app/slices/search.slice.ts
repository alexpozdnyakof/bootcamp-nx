/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
import { ApiProject, ApiTask } from '@bootcamp-nx/api-interfaces'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type SearchState = {
	status: 'idle' | 'pending' | 'error'
	data: Array<Required<ApiProject | ApiTask>>
	term: string | null
}

const initialState: SearchState = {
	status: 'idle',
	data: [],
	term: null,
}

const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		search(state, action: PayloadAction<{ title: string }>) {
			state.status = 'pending'
			state.term = action.payload.title
		},
		setMany(state, action: PayloadAction<SearchState['data']>) {
			state.status = 'idle'
			state.data = action.payload
		},
		reset(state) {
			state.status = 'idle'
			state.data = []
		},
		setError(state) {
			state.status = 'error'
		},
	},
})

export default searchSlice

export const selectSearchResult = (state: RootState) => state.search.data
