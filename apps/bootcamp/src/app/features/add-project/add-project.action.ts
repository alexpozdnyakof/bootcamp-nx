import { ApiNewProject } from '@bootcamp-nx/api-interfaces'
import { createAction } from '@reduxjs/toolkit'

export const addProject = createAction<ApiNewProject>('addProject')
export const addProjectFailed = createAction('addProject/failed')
