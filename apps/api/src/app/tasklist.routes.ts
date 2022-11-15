import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
	res.send('All lists')
})

router.get('/:id', (req, res) => {
	console.log({ id: req.params.id })
	res.send({ id: req.params.id })
})

export default router
