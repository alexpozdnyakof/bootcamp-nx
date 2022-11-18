import { UniqueId } from './data-unit'

export type ProjectValueObject = {
	id: number
	title: string
	description: string | null
}

export type ProjectDataObject = {
	id: number
	title: string
	description: string | null
}

/**
 * Abstraction over database
 */
export interface DataModel<
	T extends { [key: string]: unknown },
	U extends { [key: string]: unknown }
> {
	get(): Promise<Array<T>>
	find(id: UniqueId): Promise<T>
	delete(id: UniqueId): Promise<void>
	create(dto: U): Promise<{ id: UniqueId }>
}
