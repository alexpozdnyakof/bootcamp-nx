import { RootState } from '../store'

const selectTaskLists = (state: RootState) => state.project.lists

export default selectTaskLists
