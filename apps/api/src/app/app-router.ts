import { Router } from 'express'
import { AuthController, AuthRouterPrefix } from './auth'
import { ProjectRouterPrefix, ProjectController } from './projects'
import { TaskRouterPrefix, TaskController } from './task'
import { TasklistRouterPrefix, TasklistController } from './tasklist'
import { UserPrefix, UserController } from './user'
import { TestRouteControllerPrefix, TestRouteController } from './test-routes'
import { auth } from './auth'

const AppRouter = Router()
const authGuard = auth()
AppRouter.use(`/${ProjectRouterPrefix}`, authGuard, ProjectController)
AppRouter.use(`/${TasklistRouterPrefix}`, TasklistController)
AppRouter.use(`/${TaskRouterPrefix}`, TaskController)
AppRouter.use(`/${AuthRouterPrefix}`, AuthController)
AppRouter.use(`/${UserPrefix}`, authGuard, UserController)

if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
	AppRouter.use(`/${TestRouteControllerPrefix}`, TestRouteController)
}

export default AppRouter
