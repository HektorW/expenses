import { writable } from 'svelte/store'
import type { PersonId } from '../types/app.types'
import { getParsedLocalStorageState, saveStateToLocalStorage } from './appStore.utils'

type AppStoreState = {
	lastExpensePersonId?: PersonId | null
	lastPaymentPersonId?: PersonId | null
}

const localStorageKey = 'app'
const defaultState: AppStoreState = {
	lastExpensePersonId: null,
	lastPaymentPersonId: null
}

export const appStore = writable(getParsedLocalStorageState(localStorageKey, defaultState))

appStore.subscribe((state) => {
	saveStateToLocalStorage(localStorageKey, state)
})
