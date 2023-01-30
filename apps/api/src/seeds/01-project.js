exports.seed = async function (knex) {
	await knex('project').del()

	await knex('project').insert([
		{
			id: 1,
			owner_id: 1,
			title: 'ホームページのリニューアル',
			description: '新しいフレッシュホームページの制作過程はこちら',
			created: '2022-11-29 15:31:37',
			updated: '2022-11-29 15:31:37',
		},
		{
			id: 2,
			owner_id: 1,
			title: 'チェックアウトフォームのリファクタリング',
			description: '新しいチェックアウト',
			created: '2022-11-29 15:31:37',
			updated: '2022-11-29 15:31:37',
		},
		{
			id: 3,
			owner_id: 2,
			title: '実験プロジェクト',
			description: null,
			created: '2022-11-29 15:31:37',
			updated: '2022-11-29 15:31:37',
		},
	])
}
