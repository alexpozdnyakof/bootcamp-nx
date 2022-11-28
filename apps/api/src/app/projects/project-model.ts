import { DataModel } from '../database'
import { Project, ProjectDTO } from './project'

function ProjectModel() {
	const tableName = 'projects'
	const dataModel = DataModel<ProjectDTO, Project>(tableName)

	return Object.freeze({
		async GetAll(): Promise<Project[]> {
			try {
				return await dataModel.Get()
			} catch (e) {
				throw new Error(e?.message)
			}
		},
		async GetOne(id: UniqueId): Promise<Project> {
			try {
				return await dataModel.FindById(id)
			} catch (e) {
				throw new Error(e?.message)
			}
		},
		async Add(dto: ProjectDTO): Promise<void> {
			try {
				await dataModel.Insert(dto)
			} catch (e) {
				throw new Error(e?.message)
			}
		},

		async Delete(id: UniqueId): Promise<void> {
			try {
				await dataModel.Delete(id)
			} catch (e) {
				throw new Error(e?.message)
			}
		},

		async Update(id: UniqueId, dto: ProjectDTO): Promise<void> {
			try {
				await dataModel.Update(id, dto)
			} catch (e) {
				throw new Error(e?.message)
			}
		},
	})
}

export default ProjectModel()
