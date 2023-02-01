import { ApiTask, ResponseWithData } from '@bootcamp-nx/api-interfaces'
import { ApiBootcamp } from '@bootcamp-nx/data-access-bootcamp'
import { PayloadAction } from '@reduxjs/toolkit'
import { call, fork, put, take } from 'redux-saga/effects'
import { taskSlice } from '../../slices'
import { loadTask, loadTaskFailed } from './add-task.actions'

function* addTaskWorker({
	projectId,
	title,
}: {
	projectId: number
	title: string
}) {
	const BootcampApi = ApiBootcamp()
	try {
		const response: { data: { id: number } } = yield call(
			BootcampApi.SaveTask,
			{
				title,
				project_id: projectId,
				done: false,
			}
		)
		const taskId = response.data.id

		const responseTask: ResponseWithData<ApiTask> = yield call(
			BootcampApi.GetTask,
			taskId
		)

		yield put(taskSlice.actions.addTask(responseTask.data))
	} catch (error) {
		yield put(loadTaskFailed({ error: 'load to failed tasks' }))
	}
}

export default function* addTaskWatcher() {
	while (true) {
		const action: PayloadAction<{ projectId: number; title: string }> =
			yield take(loadTask.type)
		yield fork(addTaskWorker, action.payload)
	}
}
