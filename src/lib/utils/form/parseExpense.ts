import type { NewExpense, NewExpenseItem } from '$lib/types/app.types'
import { getDateString } from '../dateUtils'
import {
	fcnByPersonId,
	fcnClientId,
	fcnDate,
	fcnItemClientId,
	fcnTitle,
	getFcnItemAmount,
	getFcnItemForPersonIds,
	getFcnItemTitle
} from '../formControlNames'
import {
	parseFormDataEntryValueNumber,
	parseFormDataEntryValueString,
	parseFormDataString
} from '../formDataUtils'
import { isPresent } from '../tbdUtils'

export function parseExpenseFormData(formData: FormData): NewExpense {
	const clientId = parseFormDataString(formData, fcnClientId)
	const title = parseFormDataString(formData, fcnTitle)
	const byPersonId = parseFormDataString(formData, fcnByPersonId)
	const dateStr =
		parseFormDataString(formData, fcnDate) ?? getDateString(new Date())
	const expenseItems = parseFormDataExpenseItems(formData)

	if (!clientId) {
		throw 'Missing client id'
	}

	if (!byPersonId) {
		throw 'Missing by person id'
	}

	return {
		clientId,
		byPersonId,
		title,
		dateStr,
		expenseItems
	}
}

export function parseFormDataExpenseItems(
	formData: FormData
): NewExpenseItem[] {
	const itemClientIds = formData.getAll(fcnItemClientId)

	return itemClientIds.map((rawItemClientId) => {
		const itemClientId = parseFormDataEntryValueString(rawItemClientId)
		if (!itemClientId) {
			throw 'Invalid item client id'
		}

		const itemTitle = parseFormDataEntryValueString(
			formData.get(getFcnItemTitle(itemClientId))
		)
		if (!itemTitle) {
			throw `Invalid title for expense item (${itemClientId})`
		}

		const itemAmount = parseFormDataEntryValueNumber(
			formData.get(getFcnItemAmount(itemClientId))
		)
		if (itemAmount === null || itemAmount < 0) {
			throw `Invalid amount for expense item (${itemClientId})`
		}

		const forPersonIds = formData
			.getAll(getFcnItemForPersonIds(itemClientId))
			.map((rawPersonId) => parseFormDataEntryValueString(rawPersonId))
			.filter(isPresent)

		if (forPersonIds.length === 0) {
			throw 'Must pass at least one valid for person id'
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
