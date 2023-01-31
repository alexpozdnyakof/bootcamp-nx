import { json } from 'body-parser'
import cors from 'cors'
import express, { Router } from 'express'
import morgan from 'morgan'
import { auth, AuthRouterPrefix, AuthController } from './auth'
import { ProjectRouterPrefix, ProjectRouter } from './project-routes'
import { TaskRouterPrefix, TaskRouter } from './task-routes'
import { TestRouteController, TestRouteControllerPrefix } from './test-routes'
import { UserPrefix, UserRouter } from './user-routes'

const app = express()

morgan.token('body', req => JSON.stringify(req.body))

app.use(cors())
app.use(json())

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

const appRouter = Router()
const authGuard = auth()

appRouter.use(`/${ProjectRouterPrefix}`, authGuard, ProjectRouter)
appRouter.use(`/${UserPrefix}`, authGuard, UserRouter)
appRouter.use(`/${TaskRouterPrefix}`, authGuard, TaskRouter)
appRouter.use(`/${AuthRouterPrefix}`, AuthController)

if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
	appRouter.use(`/${TestRouteControllerPrefix}`, TestRouteController)
}

app.use('/api', appRouter)

export default app
