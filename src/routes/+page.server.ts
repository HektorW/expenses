import { getPrismaClient } from '$lib/db/prisma'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	const prisma = getPrismaClient()

	await prisma.$connect()

	const persons = await prisma.person.findMany()
	const expenses = await prisma.expense.findMany({
		orderBy: { date: 'desc' },
		include: { expenseItems: true }
	})

	await prisma.$disconnect()

	return {
		persons,
		expenses
	}
}
