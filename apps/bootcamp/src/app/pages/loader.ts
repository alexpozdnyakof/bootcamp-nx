import { ApiTask, ApiTaskList } from '@bootcamp-nx/api-interfaces'
import { ApiBootcamp } from '@bootcamp-nx/data-access-bootcamp'
import { LoaderFunctionArgs } from 'react-router-dom'

export async function projectLoader({
	params,
}: LoaderFunctionArgs): Promise<
	[Array<Required<ApiTask>>, Array<ApiTaskList>, number]
> {
	const api = ApiBootcamp()
	const { id } = params
	const projectId = Number(id)

	return [
		await api.ProjectTasks(projectId),
		await api.ProjectTaskslists(projectId),
		projectId,
	]
}
