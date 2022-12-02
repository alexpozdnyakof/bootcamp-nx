import { Knex } from 'knex'
import { join } from 'path'

const config: { [key: string]: Knex.Config } = {
	development: {
		client: 'sqlite3',
		useNullAsDefault: true,
		connection: {
			filename: './db.sqlite',
		},
		migrations: {
			directory: join(__dirname, '/migrations'),
		},
		seeds: {
			directory: join(__dirname, '/seeds'),
		},
	},

	test: {
		client: 'sqlite3',
		useNullAsDefault: true,
		connection: {
			filename: ':memory:',
		},
		migrations: {
			directory: join(__dirname, '/migrations'),
		},
		seeds: {
			directory: join(__dirname, '/seeds'),
		},
	},

	production: {
		client: 'sqlite3',
		useNullAsDefault: true,
		connection: {
			filename: './db.sqlite',
		},
		migrations: {
			directory: join(__dirname, '/migrations'),
		},
		seeds: {
			directory: join(__dirname, '/seeds'),
		},
	},
}

export default config
