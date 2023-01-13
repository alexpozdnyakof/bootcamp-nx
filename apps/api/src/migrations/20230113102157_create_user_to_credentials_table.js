exports.up = function (knex) {
	return knex.schema.createTable('userCredential', table => {
		table.increments('id').primary()
		table.integer('user_id').unsigned()
		table.integer('credential_id').unsigned()

		table.foreign('user_id').references('user.id')
		table.foreign('credential_id').references('credential.id')

		table.dateTime('created').defaultTo(knex.fn.now())
		table.dateTime('updated').defaultTo(knex.fn.now())
	})
}

exports.down = function (knex) {
	return knex.schema.dropTable('userCredential')
}
