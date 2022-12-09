exports.up = function (knex) {
	return knex.schema.createTable('tasklist', table => {
		table.increments('id').primary()
		table.string('title').notNullable()
		table.string('description').nullable()
		table.dateTime('created').defaultTo(knex.fn.now())
		table.dateTime('updated').defaultTo(knex.fn.now())
	})
}

exports.down = function (knex) {
	return knex.schema.dropTable('tasklist')
}
