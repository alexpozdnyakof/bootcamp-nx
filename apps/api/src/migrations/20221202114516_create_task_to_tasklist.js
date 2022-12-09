exports.up = function (knex) {
	return knex.schema.createTable('taskTasklist', table => {
		table.increments('id').primary()
		table.integer('tasklist_id').unsigned()
		table.integer('task_id').unsigned()
		table
			.foreign('tasklist_id')
			.references('tasklist.id')
			.deferrable('deferred')
		table.foreign('task_id').references('task.id').deferrable('deferred')
		table.dateTime('created').defaultTo(knex.fn.now())
		table.dateTime('updated').defaultTo(knex.fn.now())
	})
}

exports.down = async function (knex) {
	return knex.schema.dropTable('taskTasklist')
}
