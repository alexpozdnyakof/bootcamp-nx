import { json } from 'body-parser'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import AppRouter from './app-router'
import { auth } from './auth'

import { database } from './database'

const app = express()

database.migrate.latest().then(() => database.seed.run())
morgan.token('body', req => JSON.stringify(req.body))

app.use(cors())
app.use(json())
app.use(auth())

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use('/api', AppRouter)

export default app
