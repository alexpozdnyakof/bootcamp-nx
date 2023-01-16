exports.seed = async function (knex) {
	await knex('user').del()
	await knex('credential').del()
	await knex('userCredential').del()

	await knex('user').insert([
		{
			id: 1,
			username: 'test@test.com',
			first_name: 'alex',
			last_name: 'pozdnyakof',
			birthdate: '2022-11-29 15:31:37',
			created: '2022-11-29 15:31:37',
			updated: '2022-11-29 15:31:37',
		},
		{
			id: 2,
			username: 'test2@test.com',
			first_name: 'alex',
			last_name: 'pozdnyakof',
			birthdate: '2022-11-29 15:31:37',
			created: '2022-11-29 15:31:37',
			updated: '2022-11-29 15:31:37',
		},
		{
			id: 3,
			username: 'test3@test.com',
			first_name: 'alex',
			last_name: 'pozdnyakof',
			birthdate: '2022-11-29 15:31:37',
			created: '2022-11-29 15:31:37',
			updated: '2022-11-29 15:31:37',
		},
	])

	await knex('credential').insert([
		{
			id: 1,
			password:
				'$argon2id$v=19$m=65536,t=3,p=4$u7bXrSncce+ayRiOBOSfyQ$kgE14erVAq3EmHLGqSYgLDmeQL1wGcSI+T7fE4WC8pk',
			created: '2022-11-29 15:31:37',
			updated: '2022-11-29 15:31:37',
		},
		{
			id: 2,
			password:
				'$argon2id$v=19$m=65536,t=3,p=4$u7bXrSncce+ayRiOBOSfyQ$kgE14erVAq3EmHLGqSYgLDmeQL1wGcSI+T7fE4WC8pk',
			created: '2022-11-29 15:31:37',
			updated: '2022-11-29 15:31:37',
		},
		{
			id: 3,
			password:
				'$argon2id$v=19$m=65536,t=3,p=4$u7bXrSncce+ayRiOBOSfyQ$kgE14erVAq3EmHLGqSYgLDmeQL1wGcSI+T7fE4WC8pk',
			created: '2022-11-29 15:31:37',
			updated: '2022-11-29 15:31:37',
		},
	])
	await knex('userCredential').insert([
		{
			id: 1,
			user_id: 1,
			credential_id: 1,
			created: '2022-11-29 15:31:37',
			updated: '2022-11-29 15:31:37',
		},
		{
			id: 2,
			user_id: 2,
			credential_id: 2,
			created: '2022-11-29 15:31:37',
			updated: '2022-11-29 15:31:37',
		},
		{
			id: 3,
			user_id: 3,
			credential_id: 3,
			created: '2022-11-29 15:31:37',
			updated: '2022-11-29 15:31:37',
		},
	])
}
