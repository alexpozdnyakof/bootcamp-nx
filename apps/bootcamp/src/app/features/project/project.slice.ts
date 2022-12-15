/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
import { ApiProject } from '@bootcamp-nx/api-interfaces'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type ProjectState = {
	id: number | null
	title: string | null
	description: string | null
	created: string | null
	updated: string | null
	type: 'project'
	project: ApiProject | null
}

const initialState: ProjectState = {
	id: null,
	title: null,
	description: null,
	created: null,
	updated: null,
	type: 'project',
	project: null,
}

const projectSlice = createSlice({
	name: 'project',
	initialState,
	reducers: {
		load(state, action: PayloadAction<{ id: number }>) {
			return state
		},
		loadSuccess(state, action: PayloadAction<ApiProject>) {
			const { id, title, description, created, updated } = action.payload
			state.id = id
			state.title = title
			state.description = description
			state.created = created
			state.updated = updated
		},
		loadFailed(state) {
			return state
		},
	},
})

export const { load, loadSuccess, loadFailed } = projectSlice.actions

export default projectSlice.reducer
