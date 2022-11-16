import { Router } from 'express'

const router = Router()

router.get('/projects', (req, res) => {
	res.send({ result: 'All projects' })
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
