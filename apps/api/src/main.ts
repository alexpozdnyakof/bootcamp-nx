import swaggerUi from 'swagger-ui-express'

import YAML from 'yamljs'
import app from './app/app'
import { join } from 'path'
const swaggerSpec = YAML.load(join(__dirname, 'swagger-spec.yaml'))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

const port = process.env.port || 3333
const server = app.listen(port, () => {
	console.log('Listening at http://localhost:' + port + '/api')
})

server.on('error', console.error)
