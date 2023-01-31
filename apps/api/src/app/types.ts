import {
	ResponseWithData,
	ResponseWithMessage,
} from '@bootcamp-nx/api-interfaces'
import { Request } from 'express'
import { Response } from 'express'

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

export type TypedResponse<T = void> = Response<
	T extends void
		? ResponseWithMessage
		: ResponseWithData<T> | ResponseWithMessage
>
