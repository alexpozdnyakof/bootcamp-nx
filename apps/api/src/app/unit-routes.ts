import { Router } from 'express'
import { database } from './database'
import unitService from './unit-service'

const router = Router()

router.get('/projects', async (req, res) => {
	const select = 'SELECT * FROM projects'
	new Promise((resolve, reject) => {
		database.all(select, (err, rows) => (err ? reject() : resolve(rows)))
	})
		.then(rows => res.status(200).send(rows || 'Not Found.'))
		.catch(() => res.status(404).send('Not Found.'))
})

router.get('/unit/:id', (req, res) => {
	res.send({ id: Number(req.params.id) })
})

router.delete('/unit/:id', (req, res) => {
	res.send({ id: Number(req.params.id) })
})

router.patch('/unit/:id', (req, res) => {
	res.send({ id: Number(req.params.id) })
})

export default router
