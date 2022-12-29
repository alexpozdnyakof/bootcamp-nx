import { createAction } from '@reduxjs/toolkit'

const changeTaskTitle = createAction<{ id: number; title: string }>(
	'changeTaskTitle'
)

const changeTaskTitleFailed = createAction<{ error: string }>(
	'changeTaskTitle/failed'
)

export { changeTaskTitle, changeTaskTitleFailed }
