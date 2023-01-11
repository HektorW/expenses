import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient | null = null

export function getPrismaClient() {
	if (prisma === null) {
		prisma = new PrismaClient()
	}

	return prisma
}

export async function usePrismaClient<T>(
	callback: (prisma: PrismaClient) => T | Promise<T>
): Promise<T> {
	const prisma = getPrismaClient()
	prisma.$connect()
	const result = await callback(prisma)
	prisma.$disconnect()
	return result
}
