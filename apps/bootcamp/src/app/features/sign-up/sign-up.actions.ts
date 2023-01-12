import { createAction } from '@reduxjs/toolkit'

const signUp = createAction<{ username: string; password: string }>('signUp')
const signUpFailed = createAction('signUp/failed')

export { signUp, signUpFailed }
