exports.up = function (knex) {
	return knex.schema.createTable('credential', table => {
		table.increments('id').primary()
		table.string('password').notNullable()
		table.dateTime('created').defaultTo(knex.fn.now())
		table.dateTime('updated').defaultTo(knex.fn.now())
	})
}

exports.down = function (knex) {
	return knex.schema.dropTable('credential')
}
