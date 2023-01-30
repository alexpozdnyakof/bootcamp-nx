exports.up = function (knex) {
	return knex.schema.createTable('project', table => {
		table.increments('id').primary()
		table.integer('owner_id').unsigned().nullable()
		table.string('title').notNullable()
		table.string('description').nullable()
		table.dateTime('created').defaultTo(knex.fn.now())
		table.dateTime('updated').defaultTo(knex.fn.now())

		table.foreign('owner_id').references('user.id').deferrable('deferred')
	})
}

exports.down = function (knex) {
	return knex.schema.dropTable('project')
}
