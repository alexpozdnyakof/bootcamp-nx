import { ApiTask, ResponseWithData } from '@bootcamp-nx/api-interfaces'
import { ApiBootcamp } from '@bootcamp-nx/data-access-bootcamp'
import { createSelector, PayloadAction } from '@reduxjs/toolkit'
import { call, fork, put, select, take } from 'redux-saga/effects'
import { updateOneTask } from '../../slices/task.slice'
import { toggleTask, toggleTaskFailed } from './toggle-task.actions'

const selectTask = createSelector(
	[
		(state: RootState) => state.tasks.entities,
		(state, taskId: number) => taskId,
	],
	(tasks, taskId) => tasks[taskId]
)

const BootcampApi = ApiBootcamp()

function* toggleTaskWorker(taskId: number) {
	const task: Omit<Required<ApiTask>, 'id'> = yield select(state =>
		selectTask(state, taskId)
	)
	const taskDTO = {
		title: task.title,
		done: !task.done,
		project_id: task.project_id,
	}

	try {
		yield call(BootcampApi.UpdateTask, taskId, taskDTO)

		const response: ResponseWithData<ApiTask> = yield call(
			BootcampApi.GetTask,
			taskId
		)

		yield put(updateOneTask(response.data))
	} catch (error) {
		yield put(toggleTaskFailed({ error: 'Failed to delete task' }))
	}
}

export default function* toggleTaskSaga() {
	while (true) {
		const action: PayloadAction<{ id: number }> = yield take(
			toggleTask.type
		)
		yield fork(toggleTaskWorker, action.payload.id)
	}
}
