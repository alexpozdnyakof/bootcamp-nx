import { ApiProject, ApiTask } from '@bootcamp-nx/api-interfaces'
import { PrismaClient } from '@prisma/client'
import { Router } from 'express'
import { Record, String } from 'runtypes'
import { TypedResponse } from './types'

const ProjectRouter = Router()
const ProjectRouterPrefix = 'project'

const prisma = new PrismaClient()

ProjectRouter.get('/', async (req, res: TypedResponse<Array<ApiProject>>) => {
	try {
		const { id } = req.user
		const result = await prisma.project.findMany({
			where: { owner_id: id },
		})

		res.status(200).send({ code: 200, data: result })
	} catch (error) {
		res.sendStatus(404)
	}
})

ProjectRouter.get('/:id', async (req, res: TypedResponse<ApiProject>) => {
	try {
		const project = await prisma.project.findUnique({
			where: { id: Number(req.params.id) },
		})

		if (project === null) throw new Error()

		res.status(200).send({ code: 200, data: project })
	} catch (error) {
		res.status(404).send({ code: 404, message: 'Not Found' })
	}
})

ProjectRouter.get('/:id/tasks', async (req, res: TypedResponse<ApiTask[]>) => {
	try {
		const tasks = await prisma.task.findMany({
			where: { project_id: Number(req.params.id) },
		})
		res.status(200).send({ code: 200, data: tasks })
	} catch (error) {
		res.status(400).send({ code: 400, message: error.message })
	}
})

ProjectRouter.post('/', async (req, res: TypedResponse) => {
	try {
		const newProject = Record({
			title: String,
			description: String,
		}).check(req.body)

		await prisma.project.create({
			data: {
				...newProject,
				owner_id: req.user.id,
			},
		})

		res.status(201).send({ code: 201, message: 'Created' })
	} catch (error) {
		res.status(400).send({ code: 400, message: error.message })
	}
})

export { ProjectRouter, ProjectRouterPrefix }
