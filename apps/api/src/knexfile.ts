import { Knex } from 'knex'
import { join } from 'path'

const config: { [key: string]: Knex.Config } = {
	development: {
		client: 'sqlite3',
		useNullAsDefault: true,
		connection: {
			filename: join(__dirname, '/db.sqlite'),
		},
		migrations: {
			directory: join(__dirname, '/migrations'),
			loadExtensions: ['.js'],
		},
		seeds: {
			directory: join(__dirname, '/seeds'),
			loadExtensions: ['.js'],
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
			filename: join(__dirname, '/db.sqlite'),
		},
		migrations: {
			directory: join(__dirname, '/migrations'),
			loadExtensions: ['.js'],
		},
		seeds: {
			directory: join(__dirname, '/seeds'),
			loadExtensions: ['.js'],
		},
	},
}

export default config
