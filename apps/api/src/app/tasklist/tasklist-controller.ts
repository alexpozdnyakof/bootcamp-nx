import {
	ApiTask,
	ApiTaskList,
	ApiTaskListDTO,
} from '@bootcamp-nx/api-interfaces'
import { Router } from 'express'
import { CreateTask } from '../task/task'
import { TypedRequest } from '../typed-request'
import { TypedResponse } from '../typed-response'
import { CreateTaskList, TaskListValue } from './tasklist'
import { TaskListRepo } from './tasklist-repo'

const TasklistRouter = Router()
const TaskListModel = TaskListRepo()
const TasklistRouterPrefix = 'tasklist'

TasklistRouter.get(
	'/:id',
	async (
		request: TypedRequest<{ params: { id: string } }>,
		response: TypedResponse<ApiTaskList>
	) => {
		const id = Number(request.params.id)
		try {
			const tasklist = await TaskListModel.GetOne(id)
			response.status(200).send(CreateTaskList(tasklist))
		} catch (error) {
			response.status(404).send({ code: 404, message: error.message })
		}
	}
)
TasklistRouter.get(
	'/:id/tasks',
	async (
		request: TypedRequest<{ params: { id: string } }>,
		response: TypedResponse<ApiTask[]>
	) => {
		const id = Number(request.params.id)
		try {
			const tasks = (await TaskListModel.GetRelatedTasks(id)).map(task =>
				CreateTask(task)
			)
			response.status(200).send(tasks)
		} catch (error) {
			response.status(404).send({ code: 404, message: error.message })
		}
	}
)

TasklistRouter.post(
	'/:id/task',
	async (
		request: TypedRequest<{ params: { id: string }; body: { id: number } }>,
		response: TypedResponse<void>
	) => {
		try {
			const ListId = Number(request.params.id)
			const TaskId = request.body.id
			await TaskListModel.AddTask(ListId, TaskId)

			response.sendStatus(201)
		} catch (error) {
			response.status(400).send({ code: 400, message: 'Bad Request' })
		}
	}
)

TasklistRouter.post(
	'/',
	async (
		req: TypedRequest<{ body: ApiTaskListDTO }>,
		res: TypedResponse<{ id: number }>
	) => {
		try {
			const dto = TaskListValue.check(req.body)
			const result = await TaskListModel.Save(dto)
			res.status(201).send(result)
		} catch (error) {
			res.status(400).send({ code: 400, message: error.message })
		}
	}
)

TasklistRouter.delete(
	'/:id',
	async (
		req: TypedRequest<{ params: { id: string } }>,
		res: TypedResponse<void>
	) => {
		const id = Number(req.params.id)
		try {
			const tasklist = await TaskListModel.GetOne(id)
			if (typeof tasklist == 'undefined') throw new Error('Not Found')
			await TaskListModel.Delete(id)
			res.sendStatus(204)
		} catch (error) {
			res.status(400).send({ code: 400, message: error.message })
		}
	}
)

TasklistRouter.put(
	'/:id',
	async (
		req: TypedRequest<{ params: { id: string }; body: ApiTaskListDTO }>,
		res: TypedResponse<void>
	) => {
		const id = Number(req.params.id)
		try {
			const dto = TaskListValue.check(req.body)
			await TaskListModel.Update(id, dto)
			res.status(204).send()
		} catch (error) {
			res.status(400).send({ code: 400, message: error.message })
		}
	}
)

export { TasklistRouter as TasklistController, TasklistRouterPrefix }
