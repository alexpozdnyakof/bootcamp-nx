import {
	EntityType,
	DataUnit,
	UniqueId,
	DataUnitDTO,
	DataUnitUpdateValue,
	EntityUnit,
} from './data-unit'
import databaseService, { IDatabaseService } from './db'

export function UnitService(dataBase: IDatabaseService) {
	return Object.freeze({
		get: async <T extends EntityType>(
			selector: (dataUnit: EntityUnit) => boolean
		) => await dataBase.get<T>(selector),
		find: async <T extends EntityType>(
			id: UniqueId
		): Promise<DataUnit<T>> =>
			await dataBase.find<T>(unit => unit.id === id),
		delete: async (id: UniqueId) => await dataBase.delete(id),
		patch: async (update: DataUnitUpdateValue) =>
			await dataBase.patch(update),
		create: async (dto: DataUnitDTO) => await dataBase.add(dto),
	})
}

export default UnitService(databaseService)
