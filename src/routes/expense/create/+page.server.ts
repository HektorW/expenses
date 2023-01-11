import { error, type Actions } from '@sveltejs/kit'
import { redirect } from '@sveltejs/kit'
import { getPrismaClient } from '$lib/db/prisma'
import { getDateString } from '$lib/utils/dateUtils'
import { parseFormDataString } from '$lib/utils/formDataUtils'
import type { PageServerLoad } from './$types'
import { fcnByPersonId, fcnClientId, fcnDate } from './formControlNames'
import { parseFormDataExpenseItems } from './parseFormData'

export const load: PageServerLoad = async () => {
	const prisma = getPrismaClient()
	prisma.$connect()

	const persons = await prisma.person.findMany()

	prisma.$disconnect()

	return {
		persons
	}
}

export const actions: Actions = {
	default: async (event) => {
		const data = await event.request.formData()

		const clientId = parseFormDataString(data, fcnClientId)
		const byPersonId = parseFormDataString(data, fcnByPersonId)
		const dateStr =
			parseFormDataString(data, fcnDate) ?? getDateString(new Date())
		const expenseItems = parseFormDataExpenseItems(data)

		console.log('create-expense.actions.default', {
			clientId,
			byPersonId,
			date: dateStr,
			expenseItems
		})

		if (!clientId || !byPersonId) {
			throw error(400, 'Invalid input data')
		}

		const prisma = getPrismaClient()
		prisma.$connect()

		const result = await prisma.expense.create({
			data: {
				clientId,
				byPersonId,
				date: new Date(dateStr),
				expenseItems: {
					create: expenseItems.map((expenseItem) => ({
						amount: expenseItem.amount,
						title: expenseItem.title,
						forPersonIds: expenseItem.forPersonIds
					}))
				}
			}
		})

		console.log('create-expense.actions.default.created', result)

		prisma.$disconnect()

		throw redirect(303, '/')
	}
}
