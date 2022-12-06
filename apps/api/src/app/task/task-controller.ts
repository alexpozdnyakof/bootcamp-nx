import { ApiTask } from '@bootcamp-nx/api-interfaces'
import { Router, Response } from 'express'
import { CreateTask, TaskValue } from './task'

import { TaskRepo } from './task-repo'

const TaskRouter = Router()
const TaskModel = TaskRepo()
const TaskRouterPrefix = 'task'

TaskRouter.get(
	'/:id',
	async (request, response: Response<ApiTask | { message: string }>) => {
		const id = Number(request.params.id)
		try {
			const task = await TaskModel.GetOne(id)
			const ApiTask = CreateTask(task)
			response.status(200).send(ApiTask)
		} catch (error) {
			response.status(404).send({ message: error.message })
		}
	}
)

TaskRouter.post('/', async (req, res) => {
	try {
		const dto = TaskValue.check(req.body)
		const result = await TaskModel.Add(dto)
		res.status(201).send(result)
	} catch (error) {
		res.status(400).send({ message: error.message })
	}
})

TaskRouter.delete('/:id', async (req, res) => {
	const id = Number(req.params.id)
	try {
		await TaskModel.Delete(id)
		res.status(204).send()
	} catch (error) {
		res.status(400).send({ message: error.message })
	}
})

TaskRouter.put('/:id', async (req, res) => {
	const id = Number(req.params.id)
	try {
		const dto = TaskValue.check(req.body)
		await TaskModel.Update(id, dto)
		res.status(204).send()
	} catch (error) {
		res.status(400).send({ message: error.message })
	}
})

export { TaskRouter as TaskController, TaskRouterPrefix }
