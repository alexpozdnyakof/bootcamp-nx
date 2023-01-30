import type { User } from './user'

declare global {
	namespace Express {
		interface Request {
			user?: User & { id: UniqueId }
		}
	}
}
