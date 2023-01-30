exports.seed = async function (knex) {
	await knex('section').del()

	await knex('section').insert([
		{
			id: 1,
			project_id: 1,
			title: 'すべてのフロントエンド タスク',
			description: 'プレリリースジョブのみ',
			created: '2022-11-29 15:31:37',
			updated: '2022-11-29 15:31:37',
		},
		{
			id: 2,
			project_id: 1,
			title: 'すべてのバックエンド タスク',
			description: 'プレリリースジョブのみ',
			created: '2022-11-29 15:31:37',
			updated: '2022-11-29 15:31:37',
		},
		{
			id: 3,
			project_id: 1,
			title: 'デザインバックログ',
			description: null,
			created: '2022-11-29 15:31:37',
			updated: '2022-11-29 15:31:37',
		},
	])
}
