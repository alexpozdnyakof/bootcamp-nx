import { all, fork } from 'redux-saga/effects'
import { watchSideMenu } from './features/side-menu/side-menu-saga'

export default function* root() {
	yield all([fork(watchSideMenu)])
}
