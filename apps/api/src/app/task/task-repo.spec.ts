import { database } from '../database'
import TaskRepo from './task-repo'
describe('TaskModel', () => {
	beforeAll(async () => {
		await database.migrate.up({
			name: '20221129145851_create_task_table.ts',
		})
		await database.migrate.up({
			name: '20221202114516_create_task_to_tasklist.ts',
		})
		await database.seed.run({ specific: '03-task.ts' })
	})

	it('should return task with id 1', async () => {
		await expect(TaskRepo.GetOne(1)).resolves.toMatchSnapshot()
	})

	it('should throw error when get non-existing task', async () => {
		await expect(TaskRepo.GetOne(10)).rejects.toEqual(
			new Error('Not Found')
		)
	})
	it('should create new one task', async () => {
		const dto = {
			title: '新しい計画',
			done: false,
		}
		try {
			await TaskRepo.Add(dto)
			const lastTask = await TaskRepo.GetOne(4)
			expect(lastTask).toMatchSnapshot({
				created: expect.any(String),
				updated: expect.any(String),
				done: false,
				title: '新しい計画',
				id: 4,
			})
		} catch (e) {
			console.log(e)
		}
	})
	it('should delete task with id 3', async () => {
		await TaskRepo.Delete(3)
		await expect(TaskRepo.GetOne(3)).rejects.toEqual(new Error('Not Found'))
	})

	it('should rejects when delete non-existing task ', async () => {
		await expect(TaskRepo.Delete(10)).rejects.toEqual(
			new Error('Not Found')
		)
	})

	it('should update entity with id 1', async () => {
		const dto = {
			title: '新しい計画',
			done: true,
		}

		let { title, done } = await TaskRepo.GetOne(1)

		expect({ title, done }).not.toEqual(dto)

		await TaskRepo.Update(1, dto)
		;({ title, done } = await TaskRepo.GetOne(1))

		expect({ title, done }).toEqual(dto)
	})

	it('should rejects when update non-existing task ', async () => {
		const dto = {
			title: '新しい計画',
			done: false,
		}

		await expect(TaskRepo.Update(10, dto)).rejects.toEqual(
			new Error('Not Found')
		)
	})
})
