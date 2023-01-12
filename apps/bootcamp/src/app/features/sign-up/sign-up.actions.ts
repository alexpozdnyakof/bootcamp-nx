import { ApiCredentials } from '@bootcamp-nx/api-interfaces'
import { createAction } from '@reduxjs/toolkit'

const signUp = createAction<ApiCredentials>('signUp')
const signUpFailed = createAction('signUp/failed')

export { signUp, signUpFailed }
