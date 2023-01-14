import { getPrismaClient } from '$lib/db/prisma'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	const prisma = getPrismaClient()

	await prisma.$connect()

	const [persons, expenses, todos] = await Promise.all([
		prisma.person.findMany(),

		prisma.expense.findMany({
			orderBy: { date: 'desc' },
			include: { expenseItems: true }
		}),

		prisma.todo.findMany()
	])

	await prisma.$disconnect()

	return {
		persons,
		expenses,
		todos
	}
}
