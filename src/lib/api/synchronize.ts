import axios from 'axios'
import { get } from 'svelte/store'
import { appStore } from '$lib/stores/appStore'
import {
	rawExpensesStore,
	mergeExpenses,
	mergeExpense,
	deletedExpenses
} from '$lib/stores/expensesStore'
import { persons } from '$lib/stores/personsStore'
import { parseExpenseFormData } from '$lib/utils/form/parseExpense'
import {
	deserializeFormData,
	serializeFormData
} from '$lib/utils/form/serializeForm'
import type {
	DeleteExpenseResponse,
	CreateExpenseResponse,
	StateResponse
} from '$lib/types/api.types'
import { fetchState } from './state'
import {
	addStoreItem,
	removeStoreItem,
	updateStoreItem,
	updateStoreValue
} from '$lib/utils/storeUtils'
import { attempt, hasFailed } from '$lib/utils/ts-failure'
import type { ExpenseId } from '$lib/types/app.types'

export async function synchronizeAllState() {
	let fetchedState: StateResponse
	try {
		fetchedState = await fetchState()
	} catch {
		return
	}

	persons.set(fetchedState.persons)

	rawExpensesStore.update((storeState) =>
		mergeExpenses(storeState, fetchedState.expenses)
	)

	updateStoreValue(appStore, { synchStatus: 'synched' })

	synchronizeAllUnsynched()
}

export function addExpense(formData: FormData) {
	const newExpense = parseExpenseFormData(formData)

	addStoreItem(rawExpensesStore, {
		byPersonId: newExpense.byPersonId,
		clientId: newExpense.clientId,
		date: new Date(newExpense.dateStr),
		expenseItems: newExpense.expenseItems.map((expenseItem) => ({
			amount: expenseItem.amount,
			clientId: expenseItem.clientId,
			forPersonIds: expenseItem.forPersonIds,
			title: expenseItem.title
		})),
		serializedFormData: serializeFormData(formData),
		title: newExpense.title,
		calculation: null,
		currency: null,
		imageBase64: null,
		synchFailMessages: [],
		synchStatus: 'unsynched'
	})

	updateStoreValue(appStore, {
		lastExpensePersonId: newExpense.byPersonId,
		synchStatus: 'unsynched'
	})

	synchronizeAllUnsynched()
}

export function deleteExpense(id: ExpenseId) {
	deletedExpenses.update((state) => {
		const alreadyExists = state.some((item) => item.id === id)
		if (alreadyExists) {
			return state
		}

		return [
			...state,
			{
				id,
				dateStr: new Date().toISOString()
			}
		]
	})

	synchronizeAllUnsynched()
}

export async function synchronizeAllUnsynched() {
	if (typeof navigator === 'undefined' || !navigator.onLine) {
		return
	}

	const promises: Promise<unknown>[] = []

	get(rawExpensesStore).forEach(async (expense) => {
		if (expense.synchStatus === 'unsynched') {
			const data = expense.serializedFormData
				? deserializeFormData(expense.serializedFormData)
				: null

			if (!data) {
				console.warn('No data to synch expense', expense)
				return
			}

			const request = axios.post<CreateExpenseResponse>('/expense/create', data)

			promises.push(request)

			const response = await attempt(request)
			if (hasFailed(response)) {
				return
			}

			updateStoreItem(
				rawExpensesStore,
				(item) => item.clientId === expense.clientId,
				(clientExpense) => mergeExpense(clientExpense, response.data.expense)
			)
		}
	})

	get(deletedExpenses).forEach(async (item) => {
		const request = axios.delete<DeleteExpenseResponse>(`/expense/${item.id}`)

		promises.push(request)

		const response = await attempt(request)
		if (hasFailed(response) || !response.data.success) {
			return
		}

		removeStoreItem(rawExpensesStore, item.id)
		removeStoreItem(deletedExpenses, item.id)
	})

	if (promises.length > 0) {
		updateStoreValue(appStore, { synchStatus: 'synching' })

		await Promise.all(promises)

		updateStoreValue(appStore, { synchStatus: 'synched' })
	}
}
