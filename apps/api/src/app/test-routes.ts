import { Prisma, PrismaClient, PrismaPromise } from '@prisma/client'
import { Router } from 'express'

const TestRouteController = Router()
const TestRouteControllerPrefix = 'test'
const prisma = new PrismaClient()

TestRouteController.post('/seed', async (req, res) => {
	try {
		const transactions: PrismaPromise<any>[] = []
		transactions.push(prisma.$executeRaw`PRAGMA foreign_keys = OFF;`)

		// const tablenames = await prisma.$queryRaw<
		// 	Array<{ tbl_name: string }>
		// >`SELECT tbl_name FROM sqlite_master;`
		const tablenames = [
			{ tbl_name: 'Credential' },
			{ tbl_name: 'Credential' },
			{ tbl_name: 'Task' },
			{ tbl_name: 'Project' },
			{ tbl_name: 'User' },
			{ tbl_name: 'User' },
		]
		tablenames
			.map(({ tbl_name }): string => tbl_name)
			.filter(
				tbl_name =>
					tbl_name !== '_prisma_migrations' &&
					tbl_name !== 'sqlite_sequence'
			)
			.forEach(tbl_name => {
				transactions.push(
					prisma.$executeRawUnsafe(
						`DELETE FROM sqlite_sequence WHERE name="${tbl_name}";`
					)
				)
				transactions.push(
					prisma.$executeRawUnsafe(`DELETE FROM ${tbl_name};`)
				)
			})

		transactions.push(prisma.$executeRaw`PRAGMA foreign_keys = ON;`)
		await prisma.$transaction(transactions)

		console.log(`Start seeding ...`)
		for (const u of userData) {
			const user = await prisma.user.create({
				data: u,
			})

			console.log(`Created user with id: ${user.id}`)
		}
		console.log(`Seeding finished.`)
		// await database.seed.run()
		res.sendStatus(200)
	} catch (e) {
		console.log(e)
		res.sendStatus(500)
	}
})

export { TestRouteController, TestRouteControllerPrefix }

const userData: Prisma.UserCreateInput[] = [
	{
		username: 'test@test.com',
		first_name: 'alex',
		last_name: 'pozdnyakof',
		credential: {
			create: {
				password:
					'$argon2id$v=19$m=65536,t=3,p=4$u7bXrSncce+ayRiOBOSfyQ$kgE14erVAq3EmHLGqSYgLDmeQL1wGcSI+T7fE4WC8pk',
			},
		},
		projects: {
			create: [
				{
					title: 'ホームページのリニューアル',
					description:
						'新しいフレッシュホームページの制作過程はこちら',
					tasks: {
						create: [
							{
								title: '血液レポートのグラフが空白になっている',
								done: false,
							},
							{
								title: '無効にする|| ユーザーがアカウントを無効にできない',
								done: true,
							},
							{
								title: 'プロフィール、プロフィールの編集、ポップアップ',
								done: false,
							},
							{
								title: '|| 私のプロフィール || ユーザーは、サインアップ時に設定された体重と身長を表示できません',
								done: false,
							},
						],
					},
				},
				{
					title: 'チェックアウトフォームのリファクタリング',
					description: '新しいチェックアウト',
					tasks: {
						create: [
							{
								title: '血液レポートのグラフが空白になっている',
								done: false,
							},
							{
								title: '無効にする|| ユーザーがアカウントを無効にできない',
								done: true,
							},
							{
								title: 'プロフィール、プロフィールの編集、ポップアップ',
								done: false,
							},
							{
								title: '|| 私のプロフィール || ユーザーは、サインアップ時に設定された体重と身長を表示できません',
								done: false,
							},
						],
					},
				},
			],
		},
	},
	{
		username: 'test2@test.com',

		first_name: 'alex',
		last_name: 'pozdnyakof',
		projects: {
			create: [{ title: '実験プロジェクト', description: null }],
		},
		credential: {
			create: {
				password:
					'$argon2id$v=19$m=65536,t=3,p=4$u7bXrSncce+ayRiOBOSfyQ$kgE14erVAq3EmHLGqSYgLDmeQL1wGcSI+T7fE4WC8pk',
			},
		},
	},
	{
		username: 'test3@test.com',
		first_name: 'alex',
		last_name: 'pozdnyakof',
		credential: {
			create: {
				password:
					'$argon2id$v=19$m=65536,t=3,p=4$u7bXrSncce+ayRiOBOSfyQ$kgE14erVAq3EmHLGqSYgLDmeQL1wGcSI+T7fE4WC8pk',
			},
		},
	},
]
