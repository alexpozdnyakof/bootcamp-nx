import { Database } from '../database'
import BaseRepository from '../repository'
import { Project, ProjectDTO } from './project'

function ProjectModel() {
	const Repository = BaseRepository<ProjectDTO, Project>('projects', Database)

	return Object.freeze({
		...Repository,
	})
}

export default ProjectModel()
