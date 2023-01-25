import { Router } from 'express'
import { AuthController, AuthRouterPrefix } from './auth'
import { ProjectRouterPrefix, ProjectController } from './projects'
import { TaskRouterPrefix, TaskController } from './task'
import { TasklistRouterPrefix, TasklistController } from './tasklist'
import { TestRouteControllerPrefix, TestRouteController } from './test-routes'

const AppRouter = Router()

AppRouter.use(`/${ProjectRouterPrefix}`, ProjectController)
AppRouter.use(`/${TasklistRouterPrefix}`, TasklistController)
AppRouter.use(`/${TaskRouterPrefix}`, TaskController)
AppRouter.use(`/${AuthRouterPrefix}`, AuthController)

if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
	AppRouter.use(`/${TestRouteControllerPrefix}`, TestRouteController)
}

export default AppRouter
