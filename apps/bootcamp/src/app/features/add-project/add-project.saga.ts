import {
	ApiNewProject,
	ApiProject,
	ResponseWithData,
} from '@bootcamp-nx/api-interfaces'
import { ApiBootcamp } from '@bootcamp-nx/data-access-bootcamp'
import { PayloadAction } from '@reduxjs/toolkit'
import { call, fork, put, take } from 'redux-saga/effects'
import { projectSlice } from '../../slices'
import { addProject, addProjectFailed } from './add-project.action'

const api = ApiBootcamp()

function* addProjectWorker(newProject: ApiNewProject) {
	try {
		const createProjectResponse: ResponseWithData<{ id: number }> =
			yield call(api.SaveProject, newProject)

		const newProjectResponse: ResponseWithData<ApiProject> = yield call(
			api.Project,
			createProjectResponse.data.id
		)

		yield put(projectSlice.actions.addOne(newProjectResponse.data))
	} catch (error) {
		console.log(error)
		yield put(addProjectFailed)
	}
}

export default function* addProjectWatcher() {
	const action: PayloadAction<ApiNewProject> = yield take(addProject.type)
	yield fork(addProjectWorker, action.payload)
}
