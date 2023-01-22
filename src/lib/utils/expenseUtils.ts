import type {
	ClientExpense,
	ExpenseClientId,
	PartialNewExpenseItem,
	Person
} from '../types/app.types'
import { generateClientId } from './tbdUtils'

export function generateExpenseClientId(): ExpenseClientId {
	return generateClientId()
}

export function createNewExpenseItem(
	persons?: Person[],
	otherExpenseItems?: PartialNewExpenseItem[]
): PartialNewExpenseItem {
	return {
		clientId: generateClientId(),
		forPersonIds: persons?.map((person) => person.id)
	}
}

export function getExpenseTotal(expense: {
	expenseItems: Array<{ amount?: number | undefined }>
}) {
	return expense.expenseItems.reduce(
		(total, item) =>
			typeof item.amount === 'number' ? total + item.amount : total,
		0
	)
}

export function getExpenseTitle(
	expense: Pick<ClientExpense, 'title' | 'expenseItems'>
) {
	return (
		expense.title || expense.expenseItems.map((item) => item.title).join(', ')
	)
}
