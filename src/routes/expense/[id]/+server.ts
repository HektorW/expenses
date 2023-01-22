import { error, json } from '@sveltejs/kit'
import { usePrismaClient } from '$lib/db/prisma'
import type { DeleteExpenseResponse } from '$lib/types/api.types'
import { attempt, hasFailed } from '$lib/utils/ts-failure'
import type { RequestHandler } from './$types'

export const DELETE = (async (event) => {
	const expenseId = event.params.id
	if (!expenseId) {
		throw error(400, 'Must include expense id')
	}

	await usePrismaClient(async (prisma) => {
		const expense = await prisma.expense.findFirst({ where: { id: expenseId } })
		if (!expense) {
			throw error(404, 'No such expense')
		}

		const result = await attempt(
			prisma.expense.delete({ where: { id: expenseId } })
		)

		if (hasFailed(result)) {
			throw error(500, 'Could not delete expense')
		}
	})

	const response: DeleteExpenseResponse = {
		success: true
	}

	return json(response)
}) satisfies RequestHandler
