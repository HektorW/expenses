import { writable } from 'svelte/store'
import type { Expense } from '../types/app.types'
import { getParsedLocalStorageState, saveStateToLocalStorage } from './appStore.utils'

const localStorageKey = 'expenses'
const defaultState: Expense[] = []

export const expensesStore = writable<Expense[]>(
	getParsedLocalStorageState(localStorageKey, defaultState)
)

expensesStore.subscribe((state) => {
	saveStateToLocalStorage(localStorageKey, state)
})

export function addClientExpense(expense: Expense) {
	expensesStore.update((stateExpenses) => {
		const alreadyExists = stateExpenses.some(
			(stateExpense) => stateExpense.clientId === expense.clientId
		)

		return alreadyExists ? stateExpenses : [...stateExpenses, expense]
	})
}
