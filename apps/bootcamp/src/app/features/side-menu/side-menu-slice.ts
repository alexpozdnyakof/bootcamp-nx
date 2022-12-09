/* eslint-disable no-param-reassign */
import { ApiProject } from '@bootcamp-nx/api-interfaces'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type SideMenuState = {
	projects: Array<ApiProject>
	status: 'idle' | 'pending' | 'error'
}

const initialState: SideMenuState = {
	projects: [],
	status: 'idle',
}

export const sideMenuSlice = createSlice({
	name: 'sideMenu',
	initialState,
	reducers: {
		load(state) {
			state.status = 'pending'
		},
		loadSuccess(state, action: PayloadAction<Array<ApiProject>>) {
			state.projects = action.payload
		},
		loadFailed(state) {
			state.status = 'error'
		},
	},
})

export const { load, loadSuccess, loadFailed } = sideMenuSlice.actions

export default sideMenuSlice.reducer
