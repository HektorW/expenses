import type { ApiExpense, Person } from '$lib/types/app.types'

export type StateResponse = {
	persons: Person[]
	expenses: ApiExpense[]
}

export type CreateExpenseResponse = {
	expense: ApiExpense
}

export type DeleteExpenseResponse = {
	success: boolean
}
