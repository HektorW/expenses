import {
	getParsedLocalStorageState,
	saveStateToLocalStorage
} from '$lib/stores/appStore.utils'
import { writable, type Writable } from 'svelte/store'

export function localStorageWritable<T, TRaw = T>(
	localStorageKey: string,
	defaultValue: T,
	transformLocalStorageValues?: (raw: TRaw) => T
): Writable<T> {
	const initialState = getParsedLocalStorageState(
		localStorageKey,
		defaultValue,
		transformLocalStorageValues
	)

	if (Object.prototype.toString.call(defaultValue) === '[object Object]') {
		const missingDefaultValueKeys = Object.keys(defaultValue as object).filter(
			(key) => !Object.keys(initialState as object).includes(key)
		)

		missingDefaultValueKeys.forEach((untypedKey) => {
			const key = untypedKey as keyof T
			initialState[key] = defaultValue[key]
		})
	}

	const store = writable(initialState)

	store.subscribe((state) => saveStateToLocalStorage(localStorageKey, state))

	return store
}

export function updateStoreValue<T>(store: Writable<T>, values: Partial<T>) {
	store.update((state) => {
		return { ...state, ...values }
	})
}

export function updateStoreItem<T>(
	store: Writable<T[]>,
	id: string | ((item: T) => boolean),
	values: Partial<T> | ((item: T) => T)
) {
	store.update((state) =>
		state.map((item) => {
			const isCorrectItem =
				typeof id === 'string' ? (item as { id: string }).id === id : id(item)

			if (!isCorrectItem) {
				return item
			}

			return typeof values === 'function'
				? values(item)
				: { ...item, ...values }
		})
	)
}

export function addStoreItem<T>(store: Writable<T[]>, item: T) {
	store.update((state) => [...state, item])
}

export function removeStoreItem<T>(
	store: Writable<T[]>,
	id: string | ((item: T) => boolean)
) {
	store.update((state) =>
		state.filter((item) =>
			typeof id === 'string' ? (item as { id: string }).id !== id : !id(item)
		)
	)
}
