import { usePrismaClient } from '$lib/db/prisma'
import { attempt, hasFailed } from '$lib/utils/ts-failure'
import { error } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = ({ params }) => {
	return usePrismaClient(async (prisma) => {
		const expenseId = params.id

		const expense = await attempt(
			prisma.expense.findFirst({
				where: { id: expenseId },
				include: { byPerson: true, expenseItems: true }
			})
		)

		if (hasFailed(expense) || !expense) {
			throw error(404, 'Could not find expense')
		}

		return {
			expense
		}
	})
}
