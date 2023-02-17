import {
	ApiNewProject,
	ApiProject,
	ResponseWithData,
} from '@bootcamp-nx/api-interfaces'
import { IApiBootcamp } from '@bootcamp-nx/data-access-bootcamp'
import { makeAutoObservable } from 'mobx'

export function createProjectStore(
	agent: IApiBootcamp,
	projects: Array<ApiProject> = [],
	selectedId: number | null = null
) {
	const store = {
		projects,
		selectedId,
		setSelectedId(id: number) {
			this.selectedId = id
		},
		get activeProject() {
			return this.projects.find(project => project.id === this.selectedId)
		},
		*add(project: ApiNewProject) {
			try {
				const response: ResponseWithData<{ id: number }> =
					yield agent.SaveProject(project)
				const { data }: ResponseWithData<ApiProject> =
					yield agent.Project(response.data.id)
				this.projects.push(data)
			} catch (error) {
				console.error(error)
			}
		},
		*fetch() {
			try {
				const response: ResponseWithData<Array<ApiProject>> =
					yield agent.Projects()
				this.projects = response.data
			} catch (error) {
				console.error(error)
			}
		},
	}

	makeAutoObservable(store)

	return store
}
