import { ApiProject } from '@bootcamp-nx/api-interfaces'
import { Response, Router } from 'express'
import { createApiProject } from './api-project'
import { ProjectValue } from './project'
import ProjectModel from './project-repo'

const ProjectRouter = Router()
const ProjectRouterPrefix = 'project'

ProjectRouter.get('/', async (_, res) => {
	try {
		const result = await ProjectModel.GetAll()
		res.status(200).send(result)
	} catch (error) {
		res.sendStatus(404)
	}
})

ProjectRouter.get(
	'/:id',
	async (req, res: Response<ApiProject | { message: string }>) => {
		const id = Number(req.params.id)
		try {
			const projectRow = await ProjectModel.GetOne(id)
			if (projectRow === undefined) throw new Error('Not Found')

			const tasklistsRow = await ProjectModel.GetRelatedTasklists(id)
			const ApiProject = createApiProject(projectRow, tasklistsRow)

			res.status(200).send(ApiProject)
		} catch (error) {
			res.status(404).send({ message: error.message })
		}
	}
)

ProjectRouter.post('/', async (req, res) => {
	try {
		const dto = ProjectValue.check(req.body)
		const result = await ProjectModel.Add(dto)
		res.status(201).send(result)
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
		const dto = ProjectValue.check(req.body)
		await ProjectModel.Update(id, dto)
		res.status(201).send()
	} catch (error) {
		res.status(400).send({ message: error.message })
	}
})

export { ProjectRouter as ProjectController, ProjectRouterPrefix }
