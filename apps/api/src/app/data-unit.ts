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

type EntityType = 'task' | 'task_list' | 'project'

type DataUnit<T extends EntityType> = {
	id: UniqueId
	parentId: UniqueId
	type: T
	properties: EntityPropsMap[T] & UpdatedCreatedTime
	children: Array<UniqueId>
}

type EntityUnit = DataUnit<'task'> | DataUnit<'task_list'> | DataUnit<'project'>

type AbstractStore = Array<EntityUnit>

type DataUnitDTO = Pick<
	DataUnit<keyof EntityPropsMap>,
	'parentId' | 'children' | 'type'
> & {
	properties: Omit<
		DataUnit<keyof EntityPropsMap>['properties'],
		'created' | 'updated'
	>
}

type DataUnitUpdateValue = Partial<
	Pick<DataUnitDTO, 'properties' | 'children' | 'parentId'>
> &
	Pick<EntityUnit, 'id'>

export {
	AbstractStore,
	EntityType,
	UniqueId,
	EntityUnit,
	DataUnitDTO,
	DataUnit,
	DataUnitUpdateValue,
	UpdatedCreatedTime,
}
