import type { SerializedFormData } from '$lib/types/app.types'

export function serializeFormData(formData: FormData): string {
	const serializedItems: string[] = []

	formData.forEach((value, key) => {
		if (typeof value === 'string') {
			serializedItems.push(
				`${encodeURIComponent(key)}=${encodeURIComponent(value)}`
			)
		}
	})

	return serializedItems.join('&')
}

export function deserializeFormData(
	serializedFormData: SerializedFormData
): FormData {
	const formData = new FormData()

	serializedFormData.split('&').forEach((serializedEntry) => {
		const [key, value] = serializedEntry.split('=')
		formData.append(decodeURIComponent(key), decodeURIComponent(value))
	})

	return formData
}
