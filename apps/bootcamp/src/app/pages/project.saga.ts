import {
	ApiProject,
	ApiTask,
	ApiTaskDTO,
	ApiTaskList,
} from '@bootcamp-nx/api-interfaces'
import { ApiBootcamp } from '@bootcamp-nx/data-access-bootcamp'
import { createSelector, PayloadAction } from '@reduxjs/toolkit'
import { call, fork, put, select, take } from 'redux-saga/effects'
import {
	addTask,
	addTaskSuccess,
	changeTaskStatus,
	changeTaskStatusSuccess,
	changeTaskTitle,
	changeTaskTitleSuccess,
	deleteTask,
	deleteTaskSuccess,
	load,
	loadFailed,
	loadProjectSuccess,
	loadTasklistsSuccess,
	loadTasksSuccess,
} from './project.slice'

const selectTask = createSelector(
	[state => state.project.tasks, (state, taskId: number) => taskId],
	(tasks, taskId) => tasks.find((task: ApiTask) => task.id === taskId)
)

const BootcampApi = ApiBootcamp()

export function* loadProject(projectId: number) {
	try {
		const response: ApiProject = yield call(BootcampApi.Project, projectId)
		yield put(loadProjectSuccess(response))
	} catch (error) {
		yield put(loadFailed())
	}
}

function* loadTasks(projectId: number) {
	try {
		const response: Array<Required<ApiTask>> = yield call(
			BootcampApi.ProjectTasks,
			projectId
		)
		yield put(loadTasksSuccess(response))
	} catch (error) {
		yield put(loadFailed())
	}
}

function* loadTasklists(projectId: number) {
	try {
		const response: Array<ApiTaskList> = yield call(
			BootcampApi.ProjectTaskslists,
			projectId
		)
		yield put(loadTasklistsSuccess(response))
	} catch (error) {
		yield put(loadFailed())
	}
}

function* addTaskWorker({ listId, dto }: { listId: number; dto: ApiTaskDTO }) {
	try {
		const response: { id: number } = yield call(BootcampApi.SaveTask, dto)
		const taskId = response.id
		yield call(BootcampApi.LinkTaskToTasklist, {
			listId,
			taskId,
		})

		const task: ApiTask = yield call(BootcampApi.Task, taskId)

		yield put(addTaskSuccess({ ...task, tasklist_id: listId }))
	} catch (error) {
		yield put(loadFailed())
	}
}

function* changeTaskStatusWorker(taskId: number) {
	const task: Required<ApiTask> = yield select(state =>
		selectTask(state, taskId)
	)
	const taskDTO = { title: task.title, done: !task.done }

	try {
		yield call(BootcampApi.UpdateTask, taskId, taskDTO)

		const updatedTask: ApiTask = yield call(BootcampApi.Task, taskId)

		yield put(changeTaskStatusSuccess(updatedTask))
	} catch (error) {
		yield put(loadFailed())
	}
}

function* deleteTaskWorker(taskId: number) {
	try {
		yield call(BootcampApi.DeleteTask, taskId)
		yield put(deleteTaskSuccess({ id: taskId }))
	} catch (error) {
		yield put(loadFailed())
	}
}

function* changeTaskTitleWorker({ id, title }: { id: number; title: string }) {
	const task: Required<ApiTask> = yield select(state => selectTask(state, id))
	const taskDTO = { title, done: task.done }

	try {
		yield call(BootcampApi.UpdateTask, id, taskDTO)

		const updatedTask: ApiTask = yield call(BootcampApi.Task, id)

		yield put(changeTaskTitleSuccess(updatedTask))
	} catch (error) {
		yield put(loadFailed())
	}
}

export function* watchChangeTaskStatus() {
	while (true) {
		const action: PayloadAction<{ id: number }> = yield take(
			changeTaskStatus.type
		)
		yield fork(changeTaskStatusWorker, action.payload.id)
	}
}

export function* watchChangeTaskTitle() {
	while (true) {
		const action: PayloadAction<{ id: number; title: string }> = yield take(
			changeTaskTitle.type
		)
		yield fork(changeTaskTitleWorker, action.payload)
	}
}

export function* watchDeleteTask() {
	while (true) {
		const action: PayloadAction<{ id: number }> = yield take(
			deleteTask.type
		)
		yield fork(deleteTaskWorker, action.payload.id)
	}
}

export function* watchAddTask() {
	while (true) {
		const action: PayloadAction<{ listId: number; dto: ApiTaskDTO }> =
			yield take(addTask.type)
		yield fork(addTaskWorker, action.payload)
	}
}

export function* watchProject() {
	while (true) {
		const action: PayloadAction<{ id: number }> = yield take(load.type)
		const { id } = action.payload
		yield fork(loadProject, id)
		yield fork(loadTasks, id)
		yield fork(loadTasklists, id)
	}
}
