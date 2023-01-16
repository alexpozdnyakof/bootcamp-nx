import { ApiSignUp } from '@bootcamp-nx/api-interfaces'
import { createAction } from '@reduxjs/toolkit'

const signUp = createAction<ApiSignUp>('signUp')
const signUpFailed = createAction('signUp/failed')

export { signUp, signUpFailed }
