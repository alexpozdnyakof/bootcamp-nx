import { all, fork } from 'redux-saga/effects'
import addTaskWatcher from './features/add-task/add-task.saga'
import { deleteTaskSaga } from './features/delete-task'
import { changeTaskTitleSaga } from './features/editable-task-title'
import { logoutSaga } from './features/logout'
import { toggleTaskSaga } from './features/toggle-task'
import { authSaga } from './process/auth'

export default function* root() {
	yield all([
		fork(addTaskWatcher),
		fork(deleteTaskSaga),
		fork(toggleTaskSaga),
		fork(changeTaskTitleSaga),
		fork(authSaga),
		fork(logoutSaga),
	])
}
