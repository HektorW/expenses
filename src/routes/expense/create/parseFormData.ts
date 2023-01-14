import { error } from '@sveltejs/kit'
import type { NewExpenseItem } from '$lib/types/app.types'
import {
	parseFormDataEntryValueNumber,
	parseFormDataEntryValueString
} from '$lib/utils/formDataUtils'
import { isPresent } from '$lib/utils/tbdUtils'
import {
	fcnItemClientId,
	getFcnItemAmount,
	getFcnItemForPersonIds,
	getFcnItemTitle
} from '../../../lib/utils/formControlNames'

export function parseFormDataExpenseItems(
	formData: FormData
): NewExpenseItem[] {
	const itemClientIds = formData.getAll(fcnItemClientId)

	return itemClientIds.map((rawItemClientId) => {
		const itemClientId = parseFormDataEntryValueString(rawItemClientId)
		if (!itemClientId) {
			throw error(400, 'Invalid item client id')
		}

		const itemTitle = parseFormDataEntryValueString(
			formData.get(getFcnItemTitle(itemClientId))
		)
		if (!itemTitle) {
			throw error(400, `Invalid title for expense item (${itemClientId})`)
		}

		const itemAmount = parseFormDataEntryValueNumber(
			formData.get(getFcnItemAmount(itemClientId))
		)
		if (itemAmount === null || itemAmount < 0) {
			throw error(400, `Invalid amount for expense item (${itemClientId})`)
		}

		const forPersonIds = formData
			.getAll(getFcnItemForPersonIds(itemClientId))
			.map((rawPersonId) => parseFormDataEntryValueString(rawPersonId))
			.filter(isPresent)

		if (forPersonIds.length === 0) {
			throw error(400, 'Must pass at least one valid for person id')
		}

		const expenseItem: NewExpenseItem = {
			amount: itemAmount,
			clientId: itemClientId,
			forPersonIds: forPersonIds,
			title: itemTitle
		}

		return expenseItem
	})
}
