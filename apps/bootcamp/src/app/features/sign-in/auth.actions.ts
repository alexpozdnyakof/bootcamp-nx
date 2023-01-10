import { createAction } from '@reduxjs/toolkit'

const signIn = createAction<{ username: string; password: string }>('signIn')
const signInFailed = createAction<{ error: string }>('signIn/failed')

export { signIn, signInFailed }
