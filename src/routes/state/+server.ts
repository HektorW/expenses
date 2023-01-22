import { json } from '@sveltejs/kit'
import { usePrismaClient } from '$lib/db/prisma'
import type { StateResponse } from '$lib/types/api.types'
import type { RequestHandler } from './$types'

export const GET = (() => {
	return usePrismaClient(async (prisma) => {
		const [persons, expenses] = await Promise.all([
			prisma.person.findMany(),

			prisma.expense.findMany({
				orderBy: { date: 'desc' },
				include: { expenseItems: true }
			})
		])

		const responseJson: StateResponse = {
			persons,
			expenses: expenses.map((expense) => ({
				...expense,
				date: expense.date.toISOString()
			}))
		}

		return json(responseJson)
	})
}) satisfies RequestHandler
