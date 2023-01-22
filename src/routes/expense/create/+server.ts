import { error, json } from '@sveltejs/kit'
import { usePrismaClient } from '$lib/db/prisma'
import type { NewExpense } from '$lib/types/app.types'
import { parseExpenseFormData } from '$lib/utils/form/parseExpense'
import type { CreateExpenseResponse } from '$lib/types/api.types'
import type { RequestHandler } from './$types'

export const POST = (async (event) => {
	const formData = await event.request.formData()

	let newExpense: NewExpense
	try {
		newExpense = parseExpenseFormData(formData)
	} catch (errorMessage) {
		throw error(400, errorMessage as string)
	}

	console.log('create-expense.actions.default', {
		newExpense
	})

	const result = await usePrismaClient(async (prisma) => {
		const existingExpense = await prisma.expense.findFirst({
			where: { clientId: newExpense.clientId }
		})
		if (existingExpense) {
			throw error(400, 'Expense with client id already exists')
		}

		return prisma.expense.create({
			data: {
				clientId: newExpense.clientId,
				title: newExpense.title,
				byPersonId: newExpense.byPersonId,
				date: new Date(newExpense.dateStr),
				expenseItems: {
					create: newExpense.expenseItems.map((expenseItem) => ({
						amount: expenseItem.amount,
						title: expenseItem.title,
						forPersonIds: expenseItem.forPersonIds
					}))
				}
			},
			include: { expenseItems: true }
		})
	})

	console.log('create-expense.actions.default.created', result)

	const response: CreateExpenseResponse = {
		expense: { ...result, date: result.date.toISOString() }
	}

	return json(response)
}) satisfies RequestHandler
