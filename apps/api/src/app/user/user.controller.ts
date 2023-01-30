import { ApiUser } from '@bootcamp-nx/api-interfaces'
import { Router } from 'express'
import { ResponseWithData } from '../response-types'
import { TypedResponse } from '../typed-response'
import { FindUserById } from './user.repo'

const UserController = Router()
const UserPrefix = 'user'

UserController.get(
	'/',
	async (req, res: TypedResponse<ResponseWithData<ApiUser>>) => {
		try {
			const user = await FindUserById(req.user.id)
			res.status(200).send({ code: 200, data: user })
		} catch (error) {
			res.status(401).send({ code: 401, message: 'Unauthorized' })
		}
	}
)

export { UserPrefix, UserController }
