import TaskListRepo from './tasklist-repo'
import { database } from '../database'

describe('TaskListRepo', () => {
	beforeAll(async () => {
		await database.migrate.up({
			name: '20221129145937_create_tasklist_table.ts',
		})
		await database.migrate.up({
			name: '20221130102828_create_tasklist_to_project.ts',
		})
		await database.seed.run({ specific: '02-tasklist.ts' })
	})

	it('should return all tasks', async () => {
		await expect(TaskListRepo.GetAll()).resolves.toMatchSnapshot()
	})

	it('should return task with id 1', async () => {
		await expect(TaskListRepo.GetOne(1)).resolves.toMatchSnapshot()
	})

	it('should create new one task', async () => {
		const dto = {
			title: '新しい計画',
			description: '簡単な説明',
		}
		try {
			const pre = await TaskListRepo.GetAll()
			await TaskListRepo.Add(dto)
			const past = await TaskListRepo.GetAll()

			expect(past).toHaveLength(pre.length + 1)
			expect(past[past.length - 1]).toMatchSnapshot({
				created: expect.any(String),
				updated: expect.any(String),
				...dto,
				id: expect.any(Number),
			})
		} catch (e) {
			console.log(e)
		}
	})

	it('should delete task with id 3', async () => {
		const before = await TaskListRepo.GetAll()
		await TaskListRepo.Delete(3)

		const after = await TaskListRepo.GetAll()

		expect(after.length).toBe(before.length - 1)
		await expect(TaskListRepo.GetOne(3)).resolves.toEqual(undefined)
	})

	it('should update entity with id 1', async () => {
		const dto = {
			title: '新しい計画',
			description: '簡単な説明',
		}

		let { title, description } = await TaskListRepo.GetOne(1)

		expect({ title, description }).not.toEqual(dto)

		await TaskListRepo.Update(1, dto)
		;({ title, description } = await TaskListRepo.GetOne(1))

		expect({ title, description }).toEqual(dto)
	})
})
