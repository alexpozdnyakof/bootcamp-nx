import { ApiBootcamp } from '@bootcamp-nx/data-access-bootcamp'
import { PayloadAction } from '@reduxjs/toolkit'
import { call, fork, put, take } from 'redux-saga/effects'
import { removeOneTask } from '../../slices/task.slice'
import { deleteTask, deleteTaskFailed } from './delete-task.actions'

const BootcampApi = ApiBootcamp()

function* deleteTaskWorker(taskId: number) {
	try {
		yield call(BootcampApi.DeleteTask, taskId)
		yield put(removeOneTask({ id: taskId }))
	} catch (error) {
		yield put(deleteTaskFailed({ error: 'Failed to delete task' }))
	}
}

export default function* deleteTaskWatcher() {
	while (true) {
		const action: PayloadAction<{ id: number }> = yield take(
			deleteTask.type
		)
		yield fork(deleteTaskWorker, action.payload.id)
	}
}
