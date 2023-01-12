export type ResponseWithMessage = {
	code: number
	message: string
}

export type ResponseWithData<T> = {
	code: number
	data: T
}

export type ResponseWithError = ResponseWithMessage
