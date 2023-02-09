import { ApiBootcamp } from '@bootcamp-nx/data-access-bootcamp'
import { useEffect } from 'react'
import { authSlice } from './slices'
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
}
