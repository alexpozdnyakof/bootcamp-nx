exports.up = function (knex) {
	return knex.schema.createTable('task', table => {
		table.increments('id').primary()
		table.string('title').notNullable()
		table.boolean('done').notNullable()
		table.dateTime('created').defaultTo(knex.fn.now())
		table.dateTime('updated').defaultTo(knex.fn.now())
	})
}

exports.down = function (knex) {
	return knex.schema.dropTable('task')
}
