exports.seed = async function (knex) {
	await knex('user').del()

	await knex('user').insert([
		{
			id: 1,
			username: 'test@test.com',
			password:
				'$argon2id$v=19$m=65536,t=3,p=4$u7bXrSncce+ayRiOBOSfyQ$kgE14erVAq3EmHLGqSYgLDmeQL1wGcSI+T7fE4WC8pk',
			created: '2022-11-29 15:31:37',
			updated: '2022-11-29 15:31:37',
		},
		{
			id: 2,
			username: 'test2@test.com',
			password:
				'$argon2id$v=19$m=65536,t=3,p=4$u7bXrSncce+ayRiOBOSfyQ$kgE14erVAq3EmHLGqSYgLDmeQL1wGcSI+T7fE4WC8pk',
			created: '2022-11-29 15:31:37',
			updated: '2022-11-29 15:31:37',
		},
		{
			id: 3,
			username: 'test3@test.com',
			password:
				'$argon2id$v=19$m=65536,t=3,p=4$u7bXrSncce+ayRiOBOSfyQ$kgE14erVAq3EmHLGqSYgLDmeQL1wGcSI+T7fE4WC8pk',
			created: '2022-11-29 15:31:37',
			updated: '2022-11-29 15:31:37',
		},
	])
}
