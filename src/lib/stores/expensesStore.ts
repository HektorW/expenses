import { localStorageWritable } from '$lib/utils/storeUtils'
import { derived } from 'svelte/store'
import type {
	ApiExpense,
	ClientExpense,
	DeletedExpense,
	JsonClientExpense
} from '../types/app.types'

const localStorageKey = 'expenses'
const defaultExpensesStoreState: ClientExpense[] = []

export const rawExpensesStore = localStorageWritable<
	ClientExpense[],
	JsonClientExpense[]
>(localStorageKey, defaultExpensesStoreState, (jsonExpenses) =>
	jsonExpenses.map<ClientExpense>((jsonExpense) => ({
		...jsonExpense,
		date: new Date(jsonExpense.date)
	}))
)

const deletedExpensesLocalStorageKey = 'deleted-expenses'
const defaultDeletedExpenses: DeletedExpense[] = []

export const deletedExpenses = localStorageWritable(
	deletedExpensesLocalStorageKey,
	defaultDeletedExpenses
)

export const expenses = derived(
	[rawExpensesStore, deletedExpenses],
	([expenses, deletedExpenses]) =>
		expenses
			.filter((expense) => {
				if (!expense.id) {
					return true
				}

				return !deletedExpenses.some(({ id }) => id === expense.id)
			})
			.sort((a, b) => b.date.getTime() - a.date.getTime())
)

export function mergeExpenses(
	clientExpenses: ClientExpense[],
	serverExpenses: ApiExpense[]
): ClientExpense[] {
	const mergedExpenses = serverExpenses.map((serverExpense) => {
		const clientExpense = getLocalEntity(clientExpenses, serverExpense)
		if (clientExpense) {
			return mergeExpense(clientExpense, serverExpense)
		}

		return createClientExpense(serverExpense)
	})

	clientExpenses.forEach((clientExpense) => {
		if (!clientExpense.id) {
			mergedExpenses.push(clientExpense)
		}
	})

	return mergedExpenses
}

function getLocalEntity(localState: ClientExpense[], serverEntity: ApiExpense) {
	return localState.find(
		(localEntity) =>
			localEntity.id === serverEntity.id ||
			localEntity.clientId === serverEntity.clientId
	)
}

export function mergeExpense(
	localExpense: ClientExpense,
	serverExpense: ApiExpense
): ClientExpense {
	return {
		...serverExpense,
		date: new Date(serverExpense.date),
		synchStatus: 'synched',
		synchFailMessages: []
	}
}

function createClientExpense(serverExpense: ApiExpense): ClientExpense {
	return {
		...serverExpense,
		date: new Date(serverExpense.date),
		synchStatus: 'synched',
		synchFailMessages: []
	}
}
