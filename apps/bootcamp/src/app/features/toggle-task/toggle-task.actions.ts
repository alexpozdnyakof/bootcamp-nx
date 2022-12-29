import { createAction } from '@reduxjs/toolkit'

const toggleTask = createAction<{ id: number }>('toggleTask')

const toggleTaskFailed = createAction<{ error: string }>('toggleTask/failed')

export { toggleTask, toggleTaskFailed }
