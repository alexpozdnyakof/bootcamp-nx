exports.seed = async function seed(knex) {
	// Deletes ALL existing entries
	await knex('task').del()

	// Inserts seed entries
	await knex('task').insert([
		{
			id: 1,
			title: '血液レポートのグラフが空白になっている',
			done: false,
			created: '2022-11-29 15:31:37',
			updated: '2022-11-29 15:31:37',
		},
		{
			id: 2,
			title: '無効にする|| ユーザーがアカウントを無効にできない',
			done: true,
			created: '2022-11-29 15:31:37',
			updated: '2022-11-29 15:31:37',
		},
		{
			id: 3,
			title: 'プロフィール、プロフィールの編集、ポップアップ',
			done: false,
			created: '2022-11-29 15:31:37',
			updated: '2022-11-29 15:31:37',
		},
	])

	await knex('taskTasklist').del()
	await knex('taskTasklist').insert([
		{
			id: 1,
			task_id: 1,
			tasklist_id: 1,
			created: '2022-11-29 15:31:37',
			updated: '2022-11-29 15:31:37',
		},
		{
			id: 2,
			task_id: 2,
			tasklist_id: 1,
			created: '2022-11-29 15:31:37',
			updated: '2022-11-29 15:31:37',
		},
		{
			id: 3,
			task_id: 3,
			tasklist_id: 2,
			created: '2022-11-29 15:31:37',
			updated: '2022-11-29 15:31:37',
		},
	])
}
