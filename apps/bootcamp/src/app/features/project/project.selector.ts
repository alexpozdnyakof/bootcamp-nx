import { RootState } from '../../store'

const selectProject = (state: RootState) => {
	const { id, title, description, created, updated } = state.project
	return { id, title, description, created, updated }
}
export default selectProject
