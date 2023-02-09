/* eslint-disable no-param-reassign */
import { ApiNewProject, ApiProject } from '@bootcamp-nx/api-interfaces'
import { IApiBootcamp } from '@bootcamp-nx/data-access-bootcamp'
import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit'

export const createProject = createAsyncThunk(
	'addProject',
	async (newProject: ApiNewProject, ThunkApi) => {
		const api = ThunkApi.extra as IApiBootcamp
		const {
			data: { id },
		} = await api.SaveProject(newProject)
		const result = await api.Project(id)

		return result.data
	}
)

export const fetchProjects = createAsyncThunk(
	'fetchProjects',
	async (_, ThunkApi) => {
		const api = ThunkApi.extra as IApiBootcamp
		const response = await api.Projects()

		return response.data
	}
)

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
		addOne(state, action: PayloadAction<ApiProject>) {
			entityAdapter.addOne(state, action.payload)
		},
	},
	extraReducers: builder =>
		builder
			.addCase(createProject.fulfilled, (state, action) => {
				entityAdapter.addOne(state, action.payload)
			})
			.addCase(fetchProjects.fulfilled, (state, action) => {
				entityAdapter.setAll(state, action.payload)
			}),
})

export default projectSlice
