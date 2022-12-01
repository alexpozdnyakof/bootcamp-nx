import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex('tasklist').del()

	// Inserts seed entries
	await knex('tasklist').insert([
		{
			id: 1,
			title: 'すべてのフロントエンド タスク',
			description: 'プレリリースジョブのみ',
			created: '2022-11-29 15:31:37',
			updated: '2022-11-29 15:31:37',
		},
		{
			id: 2,
			title: 'すべてのバックエンド タスク',
			description: 'プレリリースジョブのみ',
			created: '2022-11-29 15:31:37',
			updated: '2022-11-29 15:31:37',
		},
		{
			id: 3,
			title: 'デザインバックログ',
			description: null,
			created: '2022-11-29 15:31:37',
			updated: '2022-11-29 15:31:37',
		},
	])

	await knex('tasklistProject').del()
	await knex('tasklistProject').insert([
		{
			id: 1,
			project_id: 1,
			tasklist_id: 1,
			created: '2022-11-29 15:31:37',
			updated: '2022-11-29 15:31:37',
		},
		{
			id: 2,
			project_id: 1,
			tasklist_id: 2,
			created: '2022-11-29 15:31:37',
			updated: '2022-11-29 15:31:37',
		},
		{
			id: 3,
			project_id: 2,
			tasklist_id: 3,
			created: '2022-11-29 15:31:37',
			updated: '2022-11-29 15:31:37',
		},
	])
}
