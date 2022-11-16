type UniqueId = number

type UpdatedCreatedTime = {
	created: number
	updated: number
}

interface EntityPropsMap {
	task: {
		text: string
		done: boolean
	}
	task_list: {
		title: string
	}
	project: {
		title: string
	}
}

type EntityType = keyof EntityPropsMap

interface EntityValue<Type extends EntityType> {
	type: Type
	properties: EntityPropsMap[Type] & UpdatedCreatedTime
	children: Array<UniqueId>
}

type DataUnit<T extends EntityType> = {
	id: UniqueId
	parentId: UniqueId
} & EntityValue<T>

type AbstractStore = Array<DataUnit<'task' | 'task_list' | 'project'>>

export { AbstractStore, DataUnit, EntityType }
