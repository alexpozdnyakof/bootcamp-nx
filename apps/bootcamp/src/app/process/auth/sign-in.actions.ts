import { ApiCredentials } from '@bootcamp-nx/api-interfaces'
import { createAction } from '@reduxjs/toolkit'

const signIn = createAction<ApiCredentials>('signIn')
const signInFailed = createAction<{ error: string }>('signIn/failed')

export { signIn, signInFailed }
