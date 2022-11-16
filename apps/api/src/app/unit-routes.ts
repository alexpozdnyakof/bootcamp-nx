import { Router } from 'express'
import unitService from './unit-service'

const router = Router()

router.get('/projects', async (req, res) => {
	const projects = await unitService.get<'project'>(
		unit => unit.type === 'project'
	)
	res.send(projects)
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
