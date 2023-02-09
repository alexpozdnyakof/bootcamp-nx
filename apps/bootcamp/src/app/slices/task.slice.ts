import { ApiTask } from '@bootcamp-nx/api-interfaces'
import { IApiBootcamp } from '@bootcamp-nx/data-access-bootcamp'
import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit'

export const fetchProjectTasks = createAsyncThunk(
	'fetchProjectTasks',
	async (projectId: number, ThunkApi) => {
		const api = ThunkApi.extra as IApiBootcamp
		const response = await api.ProjectTasks(projectId)

		return response.data
	}
)

export const addTaskThunk = createAsyncThunk(
	'addTaskThunk',
	async (
		{
			projectId,
			title,
		}: {
			projectId: number
			title: string
		},
		ThunkApi
	) => {
		const api = ThunkApi.extra as IApiBootcamp

		const response = await api.SaveTask({
			project_id: projectId,
			title,
			done: false,
		})

		const taskId = response.data.id
		const newTaskResponse = await api.GetTask(taskId)

		return newTaskResponse.data
	}
)

export const deleteTaskThunk = createAsyncThunk(
	'deleteTaskThunk',
	async (taskId: number, ThunkApi) => {
		const api = ThunkApi.extra as IApiBootcamp
		await api.DeleteTask(taskId)
		return { id: taskId }
	}
)

export const toggleTaskThunk = createAsyncThunk(
	'toggleTaskThunk',
	async (taskId: number, ThunkApi) => {
		const state = ThunkApi.getState() as RootState
		const task = state.tasks.entities[taskId] as ApiTask
		const api = ThunkApi.extra as IApiBootcamp
		await api.UpdateTask(taskId, {
			title: task?.title,
			project_id: task?.project_id,
			done: !task.done,
		})

		const updatedTaskResponse = await api.GetTask(taskId)
		return updatedTaskResponse.data
	}
)

export const changeTaskTitleThunk = createAsyncThunk(
	'changeTaskTitleThunk',
	async ({ taskId, title }: { taskId: number; title: string }, ThunkApi) => {
		const state = ThunkApi.getState() as RootState
		const task = state.tasks.entities[taskId] as ApiTask
		const api = ThunkApi.extra as IApiBootcamp
		await api.UpdateTask(taskId, {
			title,
			project_id: task?.project_id,
			done: task.done,
		})

		const updatedTaskResponse = await api.GetTask(taskId)
		return updatedTaskResponse.data
	}
)

const entityAdapter = createEntityAdapter<ApiTask>({
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
	extraReducers: builder =>
		builder
			.addCase(fetchProjectTasks.fulfilled, (state, action) => {
				entityAdapter.setAll(state, action.payload)
			})
			.addCase(addTaskThunk.fulfilled, (state, action) => {
				entityAdapter.addOne(state, action.payload)
			})
			.addCase(deleteTaskThunk.fulfilled, (state, action) => {
				entityAdapter.removeOne(state, action.payload.id)
			})
			.addCase(toggleTaskThunk.fulfilled, (state, action) => {
				entityAdapter.updateOne(state, {
					id: action.payload.id,
					changes: action.payload,
				})
			})
			.addCase(changeTaskTitleThunk.fulfilled, (state, action) => {
				entityAdapter.updateOne(state, {
					id: action.payload.id,
					changes: action.payload,
				})
			}),
})

export default taskSlice

export const { setAll, addTask, removeOneTask, updateOneTask } =
	taskSlice.actions
