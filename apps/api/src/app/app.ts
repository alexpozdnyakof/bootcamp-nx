import { Message } from '@bootcamp-nx/api-interfaces'
import express from 'express'
import morgan from 'morgan'
import { ProjectController, ProjectRouterPrefix } from './projects'
import { TasklistController, TasklistRouterPrefix } from './tasklist'
import { TaskController, TaskRouterPrefix } from './task'

const app = express()
const router = express.Router()

morgan.token('body', req => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

const greeting: Message = { message: 'Welcome to api!' }

router.get('/api', (req, res) => {
	res.send(greeting)
})

app.use(`/${ProjectRouterPrefix}`, ProjectController)
app.use(`/${TasklistRouterPrefix}`, TasklistController)
app.use(`/${TaskRouterPrefix}`, TaskController)
app.use('/', router)

export default app
