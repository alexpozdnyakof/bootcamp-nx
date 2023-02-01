import { ApiTask, ResponseWithData } from '@bootcamp-nx/api-interfaces'
import { ApiBootcamp } from '@bootcamp-nx/data-access-bootcamp'
import { createSelector, PayloadAction } from '@reduxjs/toolkit'
import { call, fork, put, select, take } from 'redux-saga/effects'
import { updateOneTask } from '../../slices/task.slice'
import {
	changeTaskTitle,
	changeTaskTitleFailed,
} from './editable-task-title.actions'

const selectTask = createSelector(
	[
		(state: RootState) => state.tasks.entities,
		(state, taskId: number) => taskId,
	],
	(tasks, taskId) => tasks[taskId]
)

const BootcampApi = ApiBootcamp()

function* changeTaskTitleWorker({ id, title }: { id: number; title: string }) {
	const task: ApiTask = yield select(state => selectTask(state, id))
	const taskDTO = { title, done: task.done, project_id: task.project_id }

	try {
		yield call(BootcampApi.UpdateTask, id, taskDTO)
		const response: ResponseWithData<ApiTask> = yield call(
			BootcampApi.GetTask,
			id
		)
		yield put(updateOneTask(response.data))
	} catch (error) {
		yield put(
			changeTaskTitleFailed({ error: 'Failed to update task title' })
		)
	}
}

export default function* changeTaskTitleSaga() {
	while (true) {
		const action: PayloadAction<{ id: number; title: string }> = yield take(
			changeTaskTitle.type
		)
		yield fork(changeTaskTitleWorker, action.payload)
	}
}
