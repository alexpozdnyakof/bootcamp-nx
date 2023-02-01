import { ApiCredentials, ApiSignUp } from '@bootcamp-nx/api-interfaces'
import { createAction } from '@reduxjs/toolkit'

export const signIn = createAction<ApiCredentials>('signIn')
export const signInFailed = createAction<{ error: string }>('signIn/failed')
export const signUp = createAction<ApiSignUp>('signUp')
export const signUpFailed = createAction('signUp/failed')
export const logout = createAction('logout')
export const logoutFailed = createAction('logout/Failed')
