import { Router } from 'express'
import { TaskListValue } from './tasklist'
import { TaskListRepo } from './tasklist-repo'

const TasklistRouter = Router()
const TaskListModel = TaskListRepo()
const TasklistRouterPrefix = 'tasklist'

// TasklistRouter.get('/:id', async (request, response) => {
// 	const id = Number(request.params.id)
// 	try {
// 		const tasklist = await TaskListModel.GetOne(id)
// 		response.status(200).send(tasklist)
// 	} catch (error) {
// 		response.status(404).send({ message: error.message })
// 	}
// })

TasklistRouter.get('/:id/tasks', async (request, response) => {
	const id = Number(request.params.id)
	try {
		const tasks = await TaskListModel.GetRelatedTasks(id)
		response.status(200).send(tasks)
	} catch (error) {
		response.status(404).send({ message: error.message })
	}
})

TasklistRouter.post('/', async (req, res) => {
	try {
		const dto = TaskListValue.check(req.body)
		const result = await TaskListModel.Add(dto)
		res.status(201).send(result)
	} catch (error) {
		res.status(400).send({ message: error.message })
	}
})

// TasklistRouter.delete('/:id', async (req, res) => {
// 	const id = Number(req.params.id)
// 	try {
// 		await TaskListModel.Delete(id)
// 		res.status(204).send()
// 	} catch (error) {
// 		res.status(400).send({ message: error.message })
// 	}
// })

// TasklistRouter.put('/:id', async (req, res) => {
// 	const id = Number(req.params.id)
// 	try {
// 		const dto = TaskListValue.check(req.body)
// 		await TaskListModel.Update(id, dto)
// 		res.status(204).send()
// 	} catch (error) {
// 		res.status(400).send({ message: error.message })
// 	}
// })

export { TasklistRouter as TasklistController, TasklistRouterPrefix }

/**
 * Api Specification
 * Get All Projects -> Array<ApiProject>
 * Get One Project -> ApiProject
 * Get Project tasklists -> Array<ApiTasklist>
 *
 */
