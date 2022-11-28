import { Record, String } from 'runtypes'

export type Project = {
	id: UniqueId
	title: string
	description: string | null
} & UpdatedCreatedTime

export type ProjectDTO = Pick<Project, 'title' | 'description'>

export const ProjectDTO = Record({
	title: String,
	description: String,
})
