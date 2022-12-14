import { Record, String } from 'runtypes'
import { Row } from '../database'

export type ProjectValue = {
	title: string
	description: string | null
}

export type ProjectRow = Row<ProjectValue>

export const ProjectValue = Record({
	title: String,
	description: String,
})
