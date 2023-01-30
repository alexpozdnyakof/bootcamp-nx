import { ApiProject, ApiTask, ApiTaskList } from '@bootcamp-nx/api-interfaces'
import { Response, Router } from 'express'
import { ResponseWithData } from '../response-types'
import { CreateTask } from '../task/task'
import { CreateTaskList } from '../tasklist'
import { TypedResponse } from '../typed-response'
import { CreateApiProject } from './api-project'
import { ProjectValue } from './project'
import ProjectModel from './project-repo'

const ProjectRouter = Router()
const ProjectRouterPrefix = 'project'

ProjectRouter.get(
	'/',
	async (req, res: TypedResponse<ResponseWithData<Array<ApiProject>>>) => {
		try {
			const { id } = req.user
			const result = await ProjectModel.GetAll(id)
			res.status(200).send({ code: 200, data: result })
		} catch (error) {
			res.sendStatus(404)
		}
	}
)

ProjectRouter.get(
	'/:id',
	async (req, res: Response<ApiProject | { message: string }>) => {
		const id = Number(req.params.id)
		try {
			const projectRow = await ProjectModel.GetOne(id)
			if (projectRow === undefined) throw new Error('Not Found')

			const ApiProject = CreateApiProject(projectRow)

			res.status(200).send(ApiProject)
		} catch (error) {
			res.status(404).send({ message: error.message })
		}
	}
)

ProjectRouter.get(
	'/:id/sections',
	async (req, res: Response<ApiProject | { message: string }>) => {
		const id = Number(req.params.id)
		try {
			const projectRow = await ProjectModel.GetOne(id)
			if (projectRow === undefined) throw new Error('Not Found')

			const ApiProject = CreateApiProject(projectRow)

			res.status(200).send(ApiProject)
		} catch (error) {
			res.status(404).send({ message: error.message })
		}
	}
)

ProjectRouter.get(
	'/:id/tasklists',
	async (req, res: Response<Array<ApiTaskList> | { message: string }>) => {
		const id = Number(req.params.id)
		try {
			const tasklistsRow = await ProjectModel.GetRelatedTasklists(id)
			const apiTaskLists = tasklistsRow.map(row => CreateTaskList(row))
			res.status(200).send(apiTaskLists)
		} catch (error) {
			res.status(400).send({ message: error.message })
		}
	}
)
ProjectRouter.get(
	'/:id/tasks',
	async (
		req,
		res: Response<
			Array<ApiTask & { tasklist_id: number }> | { message: string }
		>
	) => {
		const id = Number(req.params.id)
		try {
			const tasksRow = await ProjectModel.GetRelatedTasks(id)

			const apiTasks = tasksRow.map(({ tasklist_id, ...row }) =>
				Object.assign(CreateTask(row), { tasklist_id })
			)
			res.status(200).send(apiTasks)
		} catch (error) {
			res.status(400).send({ message: error.message })
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
