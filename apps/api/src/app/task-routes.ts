import { ApiTask, ApiTaskDTO } from '@bootcamp-nx/api-interfaces'
import { PrismaClient } from '@prisma/client'
import { Router } from 'express'
import {
	Boolean as RTBoolean,
	Number as RTNumber,
	Record,
	String,
} from 'runtypes'
import { TypedRequest, TypedResponse } from './types'

const TaskRouter = Router()
const TaskRouterPrefix = 'task'
const prisma = new PrismaClient()

TaskRouter.get(
	'/:id',
	async (
		req: TypedRequest<{ params: { id: string } }>,
		res: TypedResponse<ApiTask>
	) => {
		const id = Number(req.params.id)
		try {
			const task = await prisma.task.findUnique({ where: { id } })
			res.status(200).json({
				code: 200,
				data: task,
			})
		} catch (error) {
			console.log(`Error: ${error.message}`)
			res.status(400).send({ code: 400, message: 'Bad Request' })
		}
	}
)

TaskRouter.post(
	'/',
	async (
		req: TypedRequest<{ body: ApiTaskDTO }>,
		res: TypedResponse<{ id: number }>
	) => {
		try {
			const dto = Record({
				title: String,
				done: RTBoolean,
				project_id: RTNumber,
			}).check(req.body)

			const result = await prisma.task.create({
				data: {
					...dto,
				},
			})

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
		res: TypedResponse
	) => {
		const id = Number(req.params.id)
		try {
			await prisma.task.delete({ where: { id } })

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
		res: TypedResponse
	) => {
		const id = Number(req.params.id)

		try {
			const dto = Record({
				title: String,
				done: RTBoolean,
			}).check(req.body)
			await prisma.task.update({ where: { id }, data: { ...dto } })

			res.status(200).send({
				code: 200,
				message: 'Updated',
			})
		} catch (error) {
			res.status(400).send({ code: 400, message: error.message })
		}
	}
)

export { TaskRouter, TaskRouterPrefix }
