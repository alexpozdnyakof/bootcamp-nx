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

	it('should create a new one list', async () => {
		const dto = {
			title: '新しい計画',
			description: '簡単な説明',
		}
		try {
			await TaskListRepo.Add(dto)
			const newTasklist = await TaskListRepo.GetOne(4)

			expect(newTasklist).toMatchSnapshot({
				created: expect.any(String),
				updated: expect.any(String),
				...dto,
				id: expect.any(Number),
			})
		} catch (e) {
			console.log(e)
		}
	})

	it('should delete the list', async () => {
		await TaskListRepo.Delete(3)
		await expect(TaskListRepo.GetOne(3)).resolves.toEqual(undefined)
	})

	it('should update the list', async () => {
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
