import { ApiProject, ApiTask } from '@bootcamp-nx/api-interfaces'
import { PrismaClient } from '@prisma/client'
import { Router } from 'express'
import { TypedRequest, TypedResponse } from './types'

const SearchRouter = Router()
const SearchRouterPrefix = 'search'
const prisma = new PrismaClient()

SearchRouter.get(
	'/',
	async (
		req: TypedRequest<{ params: { id: string } }>,
		res: TypedResponse<Array<Required<ApiTask | ApiProject>>>
	) => {
		try {
			console.log({ title: req.query.title })
			const searchTerm = req.query.title as string

			const tasks = (
				await prisma.task.findMany({
					where: {
						title: {
							contains: searchTerm,
						},
					},
				})
			).map((task): Required<ApiTask> => ({ ...task, type: 'task' }))

			const projects = (
				await prisma.project.findMany({
					where: {
						title: {
							contains: searchTerm,
						},
					},
				})
			).map(
				(project): Required<ApiProject> => ({
					...project,
					type: 'project',
				})
			)

			res.status(200).json({
				code: 200,
				data: [...projects, ...tasks],
			})
		} catch (error) {
			console.log(`Error: ${error.message}`)
			res.status(400).send({ code: 400, message: 'Bad Request' })
		}
	}
)

export { SearchRouter, SearchRouterPrefix }
