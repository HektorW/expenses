import type { ClientExpense, PersonId } from '$lib/types/app.types'
import { getExpenseTotal } from './expenseUtils'

export function generateClientId() {
	const randomStr = `${Math.random()}`.substring(2, 12)
	return `${Date.now()}-${randomStr}`
}

export function isPresent<T>(item: T | null | undefined): item is T {
	return item !== null && item !== undefined
}

export function getPersonStanding(
	expenses: Pick<ClientExpense, 'byPersonId' | 'expenseItems'>[],
	// payments:
	personId: PersonId
) {
	let totalPayedBy = 0
	let totalPayedFor = 0

	expenses.forEach((expense) => {
		if (expense.byPersonId === personId) {
			totalPayedBy += getExpenseTotal(expense)
		}

		expense.expenseItems.forEach((expenseItem) => {
			if (expenseItem.forPersonIds.includes(personId)) {
				totalPayedFor += expenseItem.amount / expenseItem.forPersonIds.length
			}
		})
	})

	return totalPayedBy - totalPayedFor
}
