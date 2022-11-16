import {
	AbstractStore,
	DataUnit,
	DataUnitDTO,
	DataUnitUpdateValue,
	EntityType,
	EntityUnit,
} from './data-unit'

const DATABASE: AbstractStore = [
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
			title: '素晴らしいタスクリスト',
			created: 1668602957123,
			updated: 1668602957123,
		},
		type: 'task_list',
		children: [3, 4, 5, 6, 7],
	},
	{
		id: 3,
		parentId: 2,
		properties: {
			text: 'プロフィール、プロフィールの編集、ポップアップ',
			done: false,
			created: 1668602957123,
			updated: 1668602957123,
		},
		type: 'task',
		children: [],
	},
	{
		id: 4,
		parentId: 2,
		properties: {
			text: '無効にする|| ユーザーがアカウントを無効にできない',
			done: true,
			created: 1668602957123,
			updated: 1668602957123,
		},
		type: 'task',
		children: [],
	},
	{
		id: 5,
		parentId: 2,
		properties: {
			text: '|| 私のプロフィール || ユーザーは、サインアップ時に設定された体重と身長を表示できません',
			done: true,
			created: 1668602957123,
			updated: 1668602957123,
		},
		type: 'task',
		children: [],
	},
	{
		id: 6,
		parentId: 2,
		properties: {
			text: 'プロフィール、プロフィールの編集、ポップアップ',
			done: true,
			created: 1668602957123,
			updated: 1668602957123,
		},
		type: 'task',
		children: [],
	},
	{
		id: 7,
		parentId: 2,
		properties: {
			text: 'ビルドを共有するには Apple 開発者アカウントが必要です',
			done: false,
			created: 1668602957123,
			updated: 1668602957123,
		},
		type: 'task',
		children: [],
	},
]

export interface IDatabaseService {
	get: <T extends EntityType>(
		selector: (dataUnit: EntityUnit) => boolean
	) => Promise<Array<DataUnit<T>>>
	find: <T extends EntityType>(
		selector: (dataUnit: EntityUnit) => boolean
	) => Promise<DataUnit<T>>
	delete: (id: EntityUnit['id']) => Promise<void>
	add: (dto: DataUnitDTO) => Promise<EntityUnit['id']>
	patch: (update: DataUnitUpdateValue) => Promise<void>
}

export function DatabaseService(
	aDatabase: AbstractStore
): Readonly<IDatabaseService> {
	let database: AbstractStore = aDatabase.slice()
	const updateDB = (update: AbstractStore) => ((database = update), null)
	const getId = () => database[database.length - 1]?.id || 0

	return Object.freeze({
		get: async <T extends EntityType>(
			selector: (dataUnit: EntityUnit) => boolean
		) => {
			return database.filter(selector) as DataUnit<T>[]
		},

		find: async <T extends EntityType>(
			selector: (dataUnit: EntityUnit) => boolean
		) => database.find(selector) as DataUnit<T>,

		delete: async (id: EntityUnit['id']) => {
			updateDB(database.filter(unit => unit.id !== id))
		},
		add: async (dto: DataUnitDTO) => {
			const id = getId() + 1
			const result = {
				...dto,
				id,
				properties: {
					...dto.properties,
					created: Date.now(),
					updated: Date.now(),
				},
			} as EntityUnit
			database.push(result)
			return id
		},
		patch: async (update: DataUnitUpdateValue) => {
			updateDB(
				database.map(unit =>
					unit.id == update.id
						? {
								...unit,
								...update,
						  }
						: unit
				) as AbstractStore
			)
		},
	})
}

export default DatabaseService(DATABASE)
