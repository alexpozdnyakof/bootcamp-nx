import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex('project').del()

	// Inserts seed entries
	await knex('project').insert([
		{
			id: 1,
			title: 'ホームページのリニューアル',
			description: '新しいフレッシュホームページの制作過程はこちら',
			created: '2022-11-29 15:31:37',
			updated: '2022-11-29 15:31:37',
		},
		{
			id: 2,
			title: 'チェックアウトフォームのリファクタリング',
			description: '新しいチェックアウト',
			created: '2022-11-29 15:31:37',
			updated: '2022-11-29 15:31:37',
		},
		{
			id: 3,
			title: '実験プロジェクト',
			description: null,
			created: '2022-11-29 15:31:37',
			updated: '2022-11-29 15:31:37',
		},
	])
}
