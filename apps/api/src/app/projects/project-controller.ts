import { Router } from 'express'
import { ProjectDTO } from './project'
import ProjectModel from './project-repo'

const ProjectRouter = Router()
const ProjectRouterPrefix = 'projects'

ProjectRouter.get('/', async (_, res) => {
	try {
		const result = await ProjectModel.GetAll()
		res.status(200).send(result)
	} catch (error) {
		res.status(404).send(error.message)
	}
})

ProjectRouter.get('/:id', async (req, res) => {
	const id = Number(req.params.id)
	try {
		const result = await ProjectModel.GetOne(id)
		if (result === undefined) throw new Error('Not Found')
		res.status(200).send(result)
	} catch (error) {
		res.status(404).send({ message: error.message })
	}
})

ProjectRouter.post('/', async (req, res) => {
	try {
		const dto = ProjectDTO.check(req.body)
		const result = await ProjectModel.Add(dto)
		res.status(200).send(result)
	} catch (error) {
		res.status(400).send({ message: error.message })
	}
})

ProjectRouter.delete('/:id', async (req, res) => {
	const id = Number(req.params.id)
	try {
		await ProjectModel.Delete(id)
		res.status(200).send()
	} catch (error) {
		res.status(400).send({ message: error.message })
	}
})

ProjectRouter.put('/:id', async (req, res) => {
	const id = Number(req.params.id)
	try {
		const dto = ProjectDTO.check(req.body)
		await ProjectModel.Update(id, dto)
		res.status(200).send()
	} catch (error) {
		res.status(400).send({ message: error.message })
	}
})

export { ProjectRouter as ProjectController, ProjectRouterPrefix }
