import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

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

export async function main() {
	console.log(`Start seeding ...`)
	for (const u of userData) {
		const user = await prisma.user.create({
			data: u,
		})

		console.log(`Created user with id: ${user.id}`)
	}
	console.log(`Seeding finished.`)
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
