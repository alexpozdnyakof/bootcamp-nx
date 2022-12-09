import { database } from '../database'
import { TaskRepo } from './task-repo'
describe('TaskModel', () => {
	const TaskModel = TaskRepo()
	beforeAll(async () => {
		await database.migrate.up({
			name: '20221129145851_create_task_table.js',
		})
		await database.migrate.up({
			name: '20221202114516_create_task_to_tasklist.js',
		})
		await database.seed.run({ specific: '03-task.js' })
	})

	it('should return task with id 1', async () => {
		await expect(TaskModel.GetOne(1)).resolves.toMatchSnapshot()
	})

	it('should throw error when get non-existing task', async () => {
		await expect(TaskModel.GetOne(10)).rejects.toEqual(
			new Error('Not Found')
		)
	})
	it('should create new one task', async () => {
		const dto = {
			title: '新しい計画',
			done: false,
		}
		try {
			await TaskModel.Add(dto)
			const lastTask = await TaskModel.GetOne(4)
			expect(lastTask).toMatchSnapshot({
				created: expect.any(String),
				updated: expect.any(String),
				done: 0,
				title: '新しい計画',
				id: 4,
			})
		} catch (e) {
			console.log(e)
		}
	})
	it('should delete task with id 3', async () => {
		await TaskModel.Delete(3)
		await expect(TaskModel.GetOne(3)).rejects.toEqual(
			new Error('Not Found')
		)
	})

	it('should rejects when delete non-existing task ', async () => {
		await expect(TaskModel.Delete(10)).rejects.toEqual(
			new Error('Not Found')
		)
	})

	it('should update entity with id 1', async () => {
		const dto = {
			title: '新しい計画',
			done: true,
		}

		let { title, done } = await TaskModel.GetOne(1)

		expect({ title, done }).not.toEqual(dto)

		await TaskModel.Update(1, dto)
		;({ title, done } = await TaskModel.GetOne(1))

		expect({ title, done }).toEqual({ title: '新しい計画', done: 1 })
	})

	it('should rejects when update non-existing task ', async () => {
		const dto = {
			title: '新しい計画',
			done: false,
		}

		await expect(TaskModel.Update(10, dto)).rejects.toEqual(
			new Error('Not Found')
		)
	})
})
