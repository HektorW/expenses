export function parseFormDataString(formData: FormData, key: string) {
	const value = formData.get(key)
	return parseFormDataEntryValueString(value)
}

export function parseFormDataEntryValueString(
	value: FormDataEntryValue | null
) {
	return typeof value === 'string' ? value : null
}

export function parseFormDataEntryValueNumber(
	value: FormDataEntryValue | null
) {
	const stringValue = parseFormDataEntryValueString(value)
	const numberValue = stringValue ? parseFloat(stringValue) : NaN
	return Number.isNaN(numberValue) ? null : numberValue
}
