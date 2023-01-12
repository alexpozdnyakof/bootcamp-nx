import { Response } from 'express'
import { ResponseWithError } from './response-types'

export type TypedResponse<T> = Response<T | ResponseWithError>
