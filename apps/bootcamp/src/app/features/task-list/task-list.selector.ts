import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../store'

const getTasksRelatedToTasklist = createSelector(
	[
		(state: RootState) => state.tasks.tasks,
		(state, tasklistId: number) => tasklistId,
	],
	(tasks, tasklistId) => tasks.filter(task => task.tasklist_id === tasklistId)
)

const getTasklists = (state: RootState) => state.tasks.lists
const getTasks = (state: RootState) => state.tasks.tasks

export { getTasksRelatedToTasklist, getTasklists, getTasks }
