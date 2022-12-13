import express from 'express'
import morgan from 'morgan'
import AppRouter from './app-router'
import { database } from './database'

const app = express()

database.migrate.latest().then(() => database.seed.run())
morgan.token('body', req => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use('/api', AppRouter)

export default app
