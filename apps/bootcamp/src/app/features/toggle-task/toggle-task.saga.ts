import { ApiTask } from '@bootcamp-nx/api-interfaces'
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
	const taskDTO = { title: task.title, done: !task.done }

	try {
		yield call(BootcampApi.UpdateTask, taskId, taskDTO)

		const updatedTask: ApiTask = yield call(BootcampApi.Task, taskId)

		yield put(updateOneTask(updatedTask))
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
