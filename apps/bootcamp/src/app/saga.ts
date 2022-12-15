import { all, fork } from 'redux-saga/effects'
import { watchProject } from './features/project/project.saga'
import { watchSideMenu } from './features/side-menu/side-menu-saga'
import { watchTasklist } from './features/task-list/task-list.saga'

export default function* root() {
	yield all([fork(watchSideMenu), fork(watchProject), fork(watchTasklist)])
}
