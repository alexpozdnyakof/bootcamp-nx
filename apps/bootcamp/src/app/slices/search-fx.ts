import { PayloadAction, Unsubscribe } from '@reduxjs/toolkit'
import { AppEffectApi, AppStartListening } from '../store'
import searchSlice from './search.slice'

async function searchFx(
	action: PayloadAction<{ title: string }>,
	listenerApi: AppEffectApi
) {
	listenerApi.cancelActiveListeners()

	const currentSearch = listenerApi.getOriginalState()[searchSlice.name].term

	await listenerApi.delay(600)
	const isSearchSame = currentSearch === action.payload.title

	if (!isSearchSame && action.payload.title !== null) {
		const searchResponse = await listenerApi.extra.Search({
			title: action.payload.title,
		})

		listenerApi.dispatch(searchSlice.actions.setMany(searchResponse.data))
	}
}

export function setupSearchListeners(
	startListening: AppStartListening
): Unsubscribe {
	const subscriptions = [
		startListening({
			actionCreator: searchSlice.actions.search,
			effect: searchFx,
		}),
	]

	return () => {
		subscriptions.forEach(unsubscribe => unsubscribe())
	}
}
