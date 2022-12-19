import { all, fork } from 'redux-saga/effects'
import { watchSideMenu } from './features/side-menu/side-menu-saga'
import { watchAddTask, watchProject } from './pages/project.saga'

export default function* root() {
	yield all([fork(watchSideMenu), fork(watchProject), fork(watchAddTask)])
}
