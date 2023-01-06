import { createAction } from '@reduxjs/toolkit'

const signIn = createAction<{ title: string; projectId: number }>('signIn')

const signInFailed = createAction<{ error: string }>('signIn/failed')

export { signIn, signInFailed }
