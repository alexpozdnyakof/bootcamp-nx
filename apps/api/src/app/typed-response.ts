import { Response } from 'express'
import { ErrorResult } from './error-result'

export type TypedResponse<T> = Response<T | ErrorResult>
