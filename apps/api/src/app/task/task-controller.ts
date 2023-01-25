import { ApiTask, ApiTaskDTO } from '@bootcamp-nx/api-interfaces'
import { Router } from 'express'
import { ResponseWithData, ResponseWithMessage } from '../response-types'
import { TypedRequest } from '../typed-request'
import { TypedResponse } from '../typed-response'
import { CreateTask, TaskValue } from './task'

import { TaskRepo } from './task-repo'

const TaskRouter = Router()
const TaskModel = TaskRepo()
const TaskRouterPrefix = 'task'

TaskRouter.get(
	'/:id',
	async (
		request: TypedRequest<{ params: { id: string } }>,
		response: TypedResponse<ApiTask>
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
		res: TypedResponse<ResponseWithData<{ id: number }>>
	) => {
		try {
			console.log({ body: req.body })
			const dto = TaskValue.check(req.body)
			const result = await TaskModel.Save(dto)

			res.status(201).send({
				code: 201,
				data: result,
			})
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
		res: TypedResponse<void>
	) => {
		const id = Number(req.params.id)
		try {
			await TaskModel.Delete(id)

			res.status(200).json({
				code: 200,
				message: 'Deleted',
			})
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
		res: TypedResponse<ResponseWithMessage>
	) => {
		const id = Number(req.params.id)

		try {
			const dto = TaskValue.check(req.body)
			await TaskModel.Update(id, dto)

			res.status(200).send({
				code: 200,
				message: 'Updated',
			})
		} catch (error) {
			res.status(400).send({ code: 400, message: error.message })
		}
	}
)

export { TaskRouter as TaskController, TaskRouterPrefix }
