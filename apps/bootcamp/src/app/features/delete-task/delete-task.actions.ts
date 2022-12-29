import { createAction } from '@reduxjs/toolkit'

const deleteTask = createAction<{ id: number }>('deleteTask')

const deleteTaskFailed = createAction<{ error: string }>('deleteTask/failed')

export { deleteTask, deleteTaskFailed }
