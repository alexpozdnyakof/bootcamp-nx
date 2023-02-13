import { ApiBootcamp } from '@bootcamp-nx/data-access-bootcamp'
import { Unsubscribe } from '@reduxjs/toolkit'
import { useEffect } from 'react'
import { authSlice } from './slices'
import { setupSearchListeners } from './slices/search-fx'
import { appStartListening } from './store'
import { useAppDispatch } from './store-hooks'

export default function useInit() {
	const dispatch = useAppDispatch()
	const api = ApiBootcamp()
	useEffect(() => {
		const getUser = async () => {
			try {
				const user = (await api.CurrentUser()).data
				dispatch(authSlice.actions.setUser(user))
			} catch (error) {
				// eslint-disable-next-line no-console
				console.log(error)
			}
		}
		getUser()
	}, [api, dispatch])

	useEffect(() => {
		const subscriptions: Unsubscribe[] = [
			setupSearchListeners(appStartListening),
		]

		return () => subscriptions.forEach(unsubscribe => unsubscribe())
	}, [])
}
