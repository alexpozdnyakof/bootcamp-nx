import { ApiProject, ApiTask } from '@bootcamp-nx/api-interfaces'
import { ApiBootcamp } from '@bootcamp-nx/data-access-bootcamp'
import { LoaderFunctionArgs } from 'react-router-dom'

export async function projectLoader({
	params,
}: LoaderFunctionArgs): Promise<
	[Array<Required<ApiTask>>, ApiProject[], number]
> {
	const api = ApiBootcamp()
	const { id } = params
	const projectId = Number(id)

	return [
		(await api.ProjectTasks(projectId)).data,
		(await api.Projects()).data,
		projectId,
	]
}
