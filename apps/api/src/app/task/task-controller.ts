import { ApiTask, ApiTaskDTO } from '@bootcamp-nx/api-interfaces'
import { Router, Response, Request } from 'express'
import { CreateTask, TaskValue } from './task'

import { TaskRepo } from './task-repo'

type ParamsDictionary = {
	[key: string]: string
}

interface TypedRequest<
	T extends { params?: ParamsDictionary; body?: Record<string, any> }
> extends Request {
	params: T['params'] extends ParamsDictionary ? T['params'] : never
	body: T['body'] extends Record<string, any> ? T['body'] : never
}

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
	async (
		request: TypedRequest<{ params: { id: string } }>,
		response: Response<ApiTask | ErrorResult>
	) => {
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
	async (
		req: TypedRequest<{ body: ApiTaskDTO }>,
		res: Response<{ id: number } | ErrorResult>
	) => {
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

TaskRouter.delete(
	'/:id',
	async (
		req: TypedRequest<{ params: { id: string } }>,
		res: Response<void | ErrorResult>
	) => {
		const id = Number(req.params.id)
		try {
			await TaskModel.Delete(id)

			res.status(204).send()
		} catch (error) {
			console.log(`Error: ${error.message}`)

			res.status(400).send({ code: 400, message: 'Bad Request' })
		}
	}
)

TaskRouter.put(
	'/:id',
	async (
		req: TypedRequest<{
			params: { id: string }
			body: ApiTaskDTO
		}>,
		res: Response<void | ErrorResult>
	) => {
		const id = Number(req.params.id)

		try {
			const dto = TaskValue.check(req.body)
			await TaskModel.Update(id, dto)

			res.status(204).send()
		} catch (error) {
			console.log(`Error: ${error.message}`)

			res.status(400).send({ code: 400, message: error.message })
		}
	}
)

export { TaskRouter as TaskController, TaskRouterPrefix }
