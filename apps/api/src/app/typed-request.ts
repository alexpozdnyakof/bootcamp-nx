import { Request } from 'express'

type TypedParams = {
	[key: string]: string
}

type TypedBody = {
	[key: string]: any
}

export interface TypedRequest<
	T extends { params?: TypedParams; body?: TypedBody }
> extends Request {
	params: T['params'] extends TypedParams ? T['params'] : never
	body: T['body'] extends TypedBody ? T['body'] : never
}
