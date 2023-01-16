import { all, fork } from 'redux-saga/effects'
import addTaskWatcher from './features/add-task/add-task.saga'
import { deleteTaskSaga } from './features/delete-task'
import { changeTaskTitleSaga } from './features/editable-task-title'
import { signInSaga } from './features/sign-in'
import { signUpSaga } from './features/sign-up'
import { toggleTaskSaga } from './features/toggle-task'

export default function* root() {
	yield all([
		fork(addTaskWatcher),
		fork(deleteTaskSaga),
		fork(toggleTaskSaga),
		fork(changeTaskTitleSaga),
		fork(signInSaga),
		fork(signUpSaga),
	])
}
