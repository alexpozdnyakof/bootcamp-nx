import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('tasklistProject', table => {
		table.increments('id').primary()
		table.integer('project_id').unsigned()
		table.integer('tasklist_id').unsigned()

		table
			.foreign('project_id')
			.references('project.id')
			.deferrable('deferred')

		table
			.foreign('tasklist_id')
			.references('tasklist.id')
			.deferrable('deferred')
		table.dateTime('created').defaultTo(knex.fn.now())
		table.dateTime('updated').defaultTo(knex.fn.now())
	})
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('tasklistProject')
}
