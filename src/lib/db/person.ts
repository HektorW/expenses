import type { PrismaClient } from '@prisma/client'

export function getAllPersons(prisma: PrismaClient) {
	return prisma.person.findMany()
}
