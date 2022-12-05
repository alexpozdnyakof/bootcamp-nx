import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
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

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('taskTasklist')
}
