import type { PrismaClient } from '@prisma/client'

export function getAllExpenses(prisma: PrismaClient) {
	return prisma.expense.findMany()
}

// export function createExpense
