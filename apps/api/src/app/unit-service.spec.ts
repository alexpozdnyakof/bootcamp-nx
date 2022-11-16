import { AbstractStore } from './data-unit'
import { DatabaseService } from './db'
import { UnitService } from './unit-service'

const DATABASE = [
	{
		id: 1,
		parentId: 0,
		properties: {
			title: '基本的なブートキャンプ プロジェクト',
			created: 1668602957123,
			updated: 1668602957123,
		},
		type: 'project',
		children: [2],
	},
	{
		id: 2,
		parentId: 1,
		properties: {
			title: '基本的なブートキャンプ プロジェクト',
			created: 1668602957123,
			updated: 1668602957123,
		},
		type: 'project',
		children: [],
	},
]

describe('UnitService', () => {
	const unitService = UnitService(DatabaseService(DATABASE as AbstractStore))
	it('should return allProjects', async () => {
		const result = await unitService.get<'project'>(
			unit => unit.type === 'project'
		)
		expect(result).toEqual(DATABASE)
	})

	it('should return unit with id', async () => {
		const result = await unitService.find<'project'>(1)
		expect(result).toEqual(DATABASE[0])
	})

	it('should add unit', async () => {
		await unitService.create({
			parentId: 1,
			properties: {
				title: 'new list',
			},
			type: 'task_list',
			children: [],
		})
		const result = await unitService.find(3)
		expect(result).toBeDefined()
	})

	it('should delete unit', async () => {
		await unitService.delete(2)
		const result = await unitService.find(2)
		expect(result).not.toBeDefined()
	})
})
