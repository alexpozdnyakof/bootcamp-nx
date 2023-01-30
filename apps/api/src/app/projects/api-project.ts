import { ApiProject } from '@bootcamp-nx/api-interfaces'
import { ProjectRow } from './project'

export function CreateApiProject(aRow: ProjectRow): ApiProject {
	return {
		...aRow,
	} as const
}
