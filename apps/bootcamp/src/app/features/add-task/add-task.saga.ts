import { ApiTask, ApiTaskDTO } from '@bootcamp-nx/api-interfaces'
import { ApiBootcamp } from '@bootcamp-nx/data-access-bootcamp'
import { PayloadAction } from '@reduxjs/toolkit'
import { call, fork, put, take } from 'redux-saga/effects'
import { taskSlice } from '../../slices'
import { loadTask, loadTaskFailed } from './add-task.actions'

function createTaskDTO({ title }: { title: string }): ApiTaskDTO {
	return {
		title,
		done: false,
	}
}

function* addTaskWorker({
	projectId,
	title,
}: {
	projectId: number
	title: string
}) {
	const BootcampApi = ApiBootcamp()
	try {
		const response: { id: number } = yield call(
			BootcampApi.SaveTask,
			createTaskDTO({ title })
		)
		const taskId = response.id
		yield call(BootcampApi.LinkTaskToTasklist, {
			listId: projectId,
			taskId,
		})

		const task: ApiTask = yield call(BootcampApi.Task, taskId)

		yield put(
			taskSlice.actions.addTask({ ...task, tasklist_id: projectId })
		)
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
