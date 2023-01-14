import { error, redirect } from '@sveltejs/kit'
import { usePrismaClient } from '$lib/db/prisma'
import { attempt, hasFailed } from '$lib/utils/ts-failure'
import type { Actions, PageServerLoad } from './$types'
import { parseFormDataString } from '$lib/utils/formDataUtils'

export const load: PageServerLoad = async ({ parent }) => {
	const layoutData = await parent()
	return layoutData
}

export const actions: Actions = {
	deleteExpense: async (event) => {
		console.log('actions.delete', event)

		return await usePrismaClient(async (prisma) => {
			const data = await event.request.formData()

			const expenseId = parseFormDataString(data, 'expenseId')
			if (!expenseId) {
				throw error(400, 'Must include expense id')
			}

			const result = await attempt(
				prisma.expense.delete({ where: { id: expenseId } })
			)

			if (hasFailed(result)) {
				throw error(500, 'Could not delete expense')
			}

			throw redirect(301, '/')
		})
	}
}
