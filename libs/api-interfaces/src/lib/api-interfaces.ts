export interface Message {
	message: string
}
export interface ApiProject {
	id: number
	title: string
	description: string | null
	created: string
	updated: string
	tasklists: Array<{
		id: number
		title: string
		description: string | null
		created: string
		updated: string
	}>
	type: 'project'
}
