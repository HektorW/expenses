import { error } from '@sveltejs/kit'
import { usePrismaClient } from '$lib/db/prisma'
import type { PageServerLoad } from './$types'
import { attempt, hasFailed } from '$lib/utils/ts-failure'

export const load: PageServerLoad = ({ params }) => {
	return usePrismaClient(async (prisma) => {
		const personId = params.id

		const person = await attempt(
			prisma.person.findFirst({
				where: { id: personId },
				include: {
					expenses: {
						orderBy: { date: 'desc' },
						include: { expenseItems: true }
					}
				}
			})
		)

		if (hasFailed(person) || !person) {
			throw error(404, 'Could not find person')
		}

		const allExpenses = await prisma.expense.findMany({
			include: { expenseItems: true }
		})

		return {
			person,
			allExpenses
		}
	})
}
