import { Router } from 'express'
import { ProjectRouterPrefix, ProjectController } from './projects'
import { TaskRouterPrefix, TaskController } from './task'
import { TasklistRouterPrefix, TasklistController } from './tasklist'

const AppRouter = Router()

AppRouter.use(`/${ProjectRouterPrefix}`, ProjectController)
AppRouter.use(`/${TasklistRouterPrefix}`, TasklistController)
AppRouter.use(`/${TaskRouterPrefix}`, TaskController)

export default AppRouter
