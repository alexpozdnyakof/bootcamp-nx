import { Message } from '@bootcamp-nx/api-interfaces'
import express from 'express'
import morgan from 'morgan'
import { ProjectController, ProjectRouterPrefix } from './projects'

const app = express()
const router = express.Router()

morgan.token('body', req => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

const greeting: Message = { message: 'Welcome to api!' }

router.get('/api', (req, res) => {
	res.send(greeting)
})

router.get(
	'/example/b',
	function (req, res, next) {
		console.log('the response will be sent by the next function ...')
		next()
	},
	function (req, res) {
		res.send('Hello from B!')
	}
)

router.get(
	'/example/c',
	function (req, res, next) {
		console.log('the response will be sent by the next function ...')
		next()
	},
	function (req, res) {
		res.send('Hello from C!')
	}
)
app.use(`/${ProjectRouterPrefix}`, ProjectController)
app.use('/', router)

export default app
