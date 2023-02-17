import { createContext, useContext } from 'react'
import { createProjectStore, createTodoStore } from './entities'
import { createAuthStore } from './process/auth'

export const stores = Object.freeze({
	authStore: createAuthStore(),
	todoStore: createTodoStore(),
	projectStore: createProjectStore(),
})

const storesContext = createContext(stores)
export const StoresProvider = storesContext.Provider

export const useStore = () => useContext(storesContext)
