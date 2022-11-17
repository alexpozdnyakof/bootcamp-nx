import { Message } from '@bootcamp-nx/api-interfaces'
import * as express from 'express'
import { migrate } from './database/database'
import unitRoutes from './unit-routes'

const app = express()
const router = express.Router()

migrate()

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

app.use('/', router)
app.use('/', unitRoutes)

export default app
