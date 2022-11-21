import { Router } from 'express'
import database from './database/database'

const router = Router()

router.get('/projects', async (req, res) => {
	const select = 'SELECT * FROM projects'
	new Promise((resolve, reject) => {
		database.all(select, (err, rows) => (err ? reject() : resolve(rows)))
	})
		.then(rows => res.status(200).send(rows))
		.catch(error => res.status(404).send({ error }))
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
