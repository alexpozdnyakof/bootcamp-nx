import { ApiTask } from '@bootcamp-nx/api-interfaces'
import { Router, Response } from 'express'
import { CreateTask, TaskValue } from './task'

import { TaskRepo } from './task-repo'

type ErrorResult =
	| {
			code: 400
			message: 'Bad Request'
	  }
	| {
			code: 404
			message: 'Not Found'
	  }
	| {
			code: 500
			message: 'Server Error'
	  }

const TaskRouter = Router()
const TaskModel = TaskRepo()
const TaskRouterPrefix = 'task'

TaskRouter.get(
	'/:id',
	async (request, response: Response<ApiTask | ErrorResult>) => {
		const id = Number(request.params.id)
		try {
			const task = await TaskModel.GetOne(id)
			const ApiTask = CreateTask(task)

			response.status(200).send(ApiTask)
		} catch (error) {
			response.status(404).send({ code: 404, message: 'Not Found' })
		}
	}
)

TaskRouter.post(
	'/',
	async (req, res: Response<{ id: number } | ErrorResult>) => {
		try {
			const dto = TaskValue.check(req.body)
			const result = await TaskModel.Save(dto)

			res.status(201).send(result)
		} catch (error) {
			console.log(`Error: ${error.message}`)

			res.status(400).send({ code: 400, message: 'Bad Request' })
		}
	}
)

TaskRouter.delete('/:id', async (req, res: Response<ErrorResult>) => {
	const id = Number(req.params.id)
	try {
		await TaskModel.Delete(id)

		res.status(204).send()
	} catch (error) {
		console.log(`Error: ${error.message}`)

		res.status(400).send({ code: 400, message: 'Bad Request' })
	}
})

TaskRouter.put('/:id', async (req, res) => {
	const id = Number(req.params.id)
	try {
		const dto = TaskValue.check(req.body)
		await TaskModel.Update(id, dto)

		res.status(204).send()
	} catch (error) {
		console.log(`Error: ${error.message}`)

		res.status(400).send({ message: error.message })
	}
})

export { TaskRouter as TaskController, TaskRouterPrefix }
