exports.up = function (knex) {
	return knex.schema.createTable('user', table => {
		table.increments('id').primary()
		table.string('username').notNullable()
		table.string('first_name').notNullable()
		table.string('last_name').notNullable()
		table.string('birthdate').notNullable()
		table.dateTime('created').defaultTo(knex.fn.now())
		table.dateTime('updated').defaultTo(knex.fn.now())
	})
}

exports.down = function (knex) {
	return knex.schema.dropTable('user')
}
