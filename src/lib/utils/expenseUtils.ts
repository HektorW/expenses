import type {
	Expense,
	ExpenseClientId,
	ExpenseWithItems,
	PartialNewExpenseItem,
	Person,
	PersonId
} from '../types/app.types'
import { getDateString } from './dateUtils'
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

export function getExpenseTotal(expense: ExpenseWithItems) {
	return expense.expenseItems.reduce((total, item) => total + item.amount, 0)
}

export function getExpenseTitle(expense: ExpenseWithItems) {
	return expense.expenseItems.map((item) => item.title).join(', ')
}

export function createNewExpense(byPerson: PersonId): Expense {
	return {
		clientId: generateClientId(),
		serverId: null,
		synchStatus: null,
		expenseItems: [],
		title: '',
		currency: 'SEK',
		date: getDateString(new Date()),
		image: null,
		byPerson,
		forPersons: []
	}
}
