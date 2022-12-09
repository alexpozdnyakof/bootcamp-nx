import knex from 'knex'
import knexConfig from '../../knexfile'
const dbConnection = () => {
	const envConfig = knexConfig[process.env.NODE_ENV ?? 'development']
	return knex(envConfig)
}

export default dbConnection()
