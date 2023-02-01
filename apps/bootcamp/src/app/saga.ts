import { all, fork } from 'redux-saga/effects'
import { addTaskSaga } from './features/add-task'
import { deleteTaskSaga } from './features/delete-task'
import { changeTaskTitleSaga } from './features/editable-task-title'
import { toggleTaskSaga } from './features/toggle-task'
import { authSaga } from './process/auth'

export default function* root() {
	yield all([
		fork(addTaskSaga),
		fork(deleteTaskSaga),
		fork(toggleTaskSaga),
		fork(changeTaskTitleSaga),
		fork(authSaga),
	])
}
