import { ApiUser } from '@bootcamp-nx/api-interfaces'
import { PrismaClient } from '@prisma/client'
import { Router } from 'express'
import { TypedResponse } from './types'

const UserRouter = Router()
const UserPrefix = 'user'
const prisma = new PrismaClient()

UserRouter.get('/', async (req, res: TypedResponse<ApiUser>) => {
	try {
		const user = await prisma.user.findUnique({
			where: { id: Number(req.user.id) },
		})
		res.status(200).send({ code: 200, data: user })
	} catch (error) {
		res.status(401).send({ code: 401, message: 'Unauthorized' })
	}
})

export { UserPrefix, UserRouter }
