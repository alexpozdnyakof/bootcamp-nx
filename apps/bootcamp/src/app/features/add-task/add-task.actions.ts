import { createAction } from '@reduxjs/toolkit'

const loadTask = createAction<{ title: string; projectId: number }>('addTask')

const loadTaskFailed = createAction<{ error: string }>('addTask/loadFailed')

export { loadTask, loadTaskFailed }
