import { ApiBootcamp } from '@bootcamp-nx/data-access-bootcamp'
import { createContext, useContext } from 'react'
import { createProjectStore, createTodoStore } from './entities'
import { createAuthStore } from './process/auth'

const api = ApiBootcamp()

export const stores = Object.freeze({
	authStore: createAuthStore(api),
	todoStore: createTodoStore(api),
	projectStore: createProjectStore(api),
})

const storesContext = createContext(stores)
export const StoresProvider = storesContext.Provider

export const useStore = () => useContext(storesContext)
