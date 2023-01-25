import { Router } from 'express'
import { database } from './database'

const TestRouteController = Router()
const TestRouteControllerPrefix = 'test'

TestRouteController.post('/seed', async (req, res) => {
	try {
		await database.seed.run()
		res.sendStatus(200)
	} catch (e) {
		res.sendStatus(500)
	}
})

export { TestRouteController, TestRouteControllerPrefix }
