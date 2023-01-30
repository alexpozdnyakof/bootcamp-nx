exports.up = function (knex) {
	return knex.schema.createTable('section', table => {
		table.increments('id').primary()
		table.string('title').notNullable()
		table.string('description').nullable()
		table.dateTime('created').defaultTo(knex.fn.now())
		table.dateTime('updated').defaultTo(knex.fn.now())

		table.integer('project_id').unsigned().nullable()
		table
			.foreign('project_id')
			.references('project.id')
			.deferrable('deferred')
	})
}

exports.down = function (knex) {
	return knex.schema.dropTable('section')
}
