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
	page: {
		title: string
	}
}

type EntityType = keyof EntityPropsMap

interface EntityValue<Type extends EntityType> {
	type: Type
	properties: EntityPropsMap[Type] & UpdatedCreatedTime
	children: Array<UniqueId>
}

type TaskDataUnit = DataUnit<'task'>
type TaskListDataUnit = DataUnit<'task_list'>
type PageDataUnit = DataUnit<'page'>

type DataUnit<T extends EntityType> = {
	id: UniqueId
	parentId: UniqueId
} & EntityValue<T>

export { TaskDataUnit, TaskListDataUnit, PageDataUnit, EntityType }
