exports.up = function (knex) {
	return knex.schema.createTable('task', table => {
		table.increments('id').primary()
		table.integer('owner_id').unsigned().nullable()
		table.string('title').notNullable()
		table.boolean('done').notNullable()
		table.dateTime('created').defaultTo(knex.fn.now())
		table.dateTime('updated').defaultTo(knex.fn.now())
		table.foreign('owner_id').references('user.id').deferrable('deferred')
	})
}

exports.down = function (knex) {
	return knex.schema.dropTable('task')
}
