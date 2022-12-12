import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import sideMenuSliceReducer from './features/side-menu/side-menu-slice'
import tasklistSliceReducer from './features/task-list/task-list.slice'
import root from './saga'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
	reducer: {
		sideMenu: sideMenuSliceReducer,
		taskList: tasklistSliceReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(sagaMiddleware),
})

export default store

sagaMiddleware.run(root)
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
