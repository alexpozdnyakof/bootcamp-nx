import { database } from '../database'
import ProjectRepository from './project-repo'
describe('ProjectRepository', () => {
	beforeAll(async () => {
		await database.migrate.up({
			name: '20221129145930_create_project_table.js',
		})
		await database.seed.run({ specific: '01-project.js' })
	})
	it('should create new one project', async () => {
		const dto = {
			title: '新しい計画',
			description: '簡単な説明',
		}
		try {
			const pre = await ProjectRepository.GetAll(1)
			await ProjectRepository.Add(dto)
			const past = await ProjectRepository.GetAll(1)

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

	it('should update entity with id 1', async () => {
		const dto = {
			title: '新しい計画',
			description: '簡単な説明',
		}

		let { title, description } = await ProjectRepository.GetOne(1)

		expect({ title, description }).not.toEqual(dto)

		await ProjectRepository.Update(1, dto)
		;({ title, description } = await ProjectRepository.GetOne(1))

		expect({ title, description }).toEqual(dto)
	})
})
